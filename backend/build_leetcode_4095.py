import asyncio
import httpx
import json
import os
import time

query = """
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      frontendQuestionId: questionFrontendId
      title
      titleSlug
      difficulty
      paidOnly: isPaidOnly
      topicTags {
        name
      }
    }
  }
}
"""

async def fetch_graphql_page(client, skip, sem):
    async with sem:
        res = await client.post('https://leetcode.com/graphql', json={
            'query': query,
            'variables': {'categorySlug': '', 'limit': 100, 'skip': skip, 'filters': {}}
        })
        if res.status_code == 200:
            return res.json().get('data', {}).get('problemsetQuestionList', {}).get('questions', [])
        return []

async def main():
    print("Step 1: Fetching stats from leetcode.com/api/problems/all/ ...")
    async with httpx.AsyncClient(headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://leetcode.com'}, timeout=30.0) as client:
        # 1. Fetch base stats
        resp = await client.get('https://leetcode.com/api/problems/all/')
        data_all = resp.json()
        stat_pairs = data_all.get('stat_status_pairs', [])
        print(f"Base API returned {len(stat_pairs)} problems.")
        
        # Build lookup map by frontend_question_id
        stats_map = {}
        for p in stat_pairs:
            st = p.get('stat', {})
            fid = str(st.get('frontend_question_id'))
            acs = st.get('total_acs', 0)
            subs = st.get('total_submitted', 0)
            acc = round((acs / subs * 100), 1) if subs > 0 else 0.0
            stats_map[fid] = {
                'acs': acs,
                'acceptance': f"{acc}%",
                'paid': p.get('paid_only', False)
            }

        # 2. Fetch tags via GraphQL
        print("Step 2: Fetching topic tags for all questions via GraphQL ...")
        sem = asyncio.Semaphore(10)
        total_q = data_all.get('num_total', 4100)
        tasks = [fetch_graphql_page(client, skip, sem) for skip in range(0, total_q + 100, 100)]
        results = await asyncio.gather(*tasks)
        
        gql_questions = []
        for r in results:
            gql_questions.extend(r)
        print(f"GraphQL returned {len(gql_questions)} questions.")

        # Build combined list
        combined = []
        seen_ids = set()

        for q in gql_questions:
            fid_str = q.get('frontendQuestionId')
            try:
                fid = int(fid_str)
            except (ValueError, TypeError):
                fid = fid_str

            if fid_str in seen_ids:
                continue
            seen_ids.add(fid_str)

            stat_info = stats_map.get(str(fid_str), {})
            tags = [t['name'] for t in q.get('topicTags', []) if 'name' in t]

            slug = q.get('titleSlug')
            combined.append({
                'id': fid,
                'title': q.get('title'),
                'slug': slug,
                'difficulty': q.get('difficulty'),
                'paid': q.get('paidOnly', stat_info.get('paid', False)),
                'acceptance': stat_info.get('acceptance', '50.0%'),
                'tags': tags,
                'url': f"https://leetcode.com/problems/{slug}/"
            })

        # Sort by frontend question ID
        def sort_key(item):
            if isinstance(item['id'], int):
                return (0, item['id'])
            return (1, str(item['id']))

        combined.sort(key=sort_key)

        print(f"Total processed problems: {len(combined)}")
        print("First question:", combined[0])
        print("4095th question:", combined[-1])

        # Write to client public/data and client/src/data
        public_dir = os.path.abspath("../client/public/data")
        os.makedirs(public_dir, exist_ok=True)
        public_file = os.path.join(public_dir, "leetcode_4095.json")
        with open(public_file, 'w', encoding='utf-8') as f:
            json.dump(combined, f, separators=(',', ':'))
        print(f"Saved to {public_file} (size: {os.path.getsize(public_file) / 1024:.1f} KB)")

        src_dir = os.path.abspath("../client/src/data")
        os.makedirs(src_dir, exist_ok=True)
        src_file = os.path.join(src_dir, "leetcode_4095.json")
        with open(src_file, 'w', encoding='utf-8') as f:
            json.dump(combined, f, separators=(',', ':'))
        print(f"Saved to {src_file} (size: {os.path.getsize(src_file) / 1024:.1f} KB)")

        # Also save in backend data cache
        backend_data = os.path.abspath("app/data")
        os.makedirs(backend_data, exist_ok=True)
        backend_file = os.path.join(backend_data, "leetcode_4095.json")
        with open(backend_file, 'w', encoding='utf-8') as f:
            json.dump(combined, f, separators=(',', ':'))
        print(f"Saved to {backend_file} (size: {os.path.getsize(backend_file) / 1024:.1f} KB)")

if __name__ == '__main__':
    asyncio.run(main())
