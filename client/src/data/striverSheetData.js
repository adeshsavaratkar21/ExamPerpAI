// Striver's A2Z DSA Sheet - Complete 450+ Question Curriculum with Direct LeetCode Links
export const STRIVER_STEPS = [
  {
    "step": 1,
    "title": "Step 1: Learn the Basics",
    "description": "Language fundamentals, basic math, recursion, hashing & pattern logic building.",
    "topics": [
      {
        "name": "Lec 1: Things to Know & Language Basics",
        "problems": [
          {
            "id": "s1_1",
            "title": "User Input / Output & Data Types",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/add-two-integers/",
            "companies": [
              "TCS",
              "Infosys"
            ],
            "hint": "Understand primitive data types, memory bounds, and standard I/O."
          },
          {
            "id": "s1_2",
            "title": "If Else statements & Switch Case",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/fizz-buzz/",
            "companies": [
              "Wipro",
              "Accenture"
            ],
            "hint": "Master multi-branch conditional evaluations."
          },
          {
            "id": "s1_3",
            "title": "What are arrays and strings?",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/concatenation-of-array/",
            "companies": [
              "Infosys"
            ],
            "hint": "Continuous memory layout and 0-based indexing."
          },
          {
            "id": "s1_4",
            "title": "For loops and While loops",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/sum-of-all-odd-length-subarrays/",
            "companies": [
              "TCS"
            ],
            "hint": "Iterative bounds, step conditions, and loop invariant."
          },
          {
            "id": "s1_5",
            "title": "Functions (Pass by Value vs Reference)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/swap-nodes-in-pairs/",
            "companies": [
              "Cognizant"
            ],
            "hint": "Copy semantics vs pointer/alias referencing in language runtime."
          },
          {
            "id": "s1_6",
            "title": "Time and Space Complexity Analysis",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/maximum-subarray/",
            "companies": [
              "Microsoft",
              "Amazon"
            ],
            "hint": "Big-O, Big-Theta, Big-Omega notation and worst-case call stack analysis."
          }
        ]
      },
      {
        "name": "Lec 2: Build-up Logical Thinking (Patterns 1 to 22)",
        "problems": [
          {
            "id": "s1_7",
            "title": "Pattern 1: Rectangular Star Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "TCS Digital"
            ],
            "hint": "Nested loops: N rows and N columns."
          },
          {
            "id": "s1_8",
            "title": "Pattern 2: Right-Angled Triangle Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/pascals-triangle/",
            "companies": [
              "Infosys"
            ],
            "hint": "Row i has i stars."
          },
          {
            "id": "s1_9",
            "title": "Pattern 3: Right-Angled Number Pyramid",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/pascals-triangle-ii/",
            "companies": [
              "Wipro"
            ],
            "hint": "Print column index j from 1 to i."
          },
          {
            "id": "s1_10",
            "title": "Pattern 4: Right-Angled Number Pyramid - II",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Accenture"
            ],
            "hint": "Print row index i repeatedly."
          },
          {
            "id": "s1_11",
            "title": "Pattern 5: Inverted Right Pyramid",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "TCS"
            ],
            "hint": "Stars count decreases as (N - i + 1)."
          },
          {
            "id": "s1_12",
            "title": "Pattern 6: Inverted Number Pyramid",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Cognizant"
            ],
            "hint": "Numbers from 1 to (N - i + 1)."
          },
          {
            "id": "s1_13",
            "title": "Pattern 7: Star Pyramid (Equilateral)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Spaces = N-i-1, stars = 2*i + 1."
          },
          {
            "id": "s1_14",
            "title": "Pattern 8: Inverted Star Pyramid",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Spaces = i, stars = 2*(N-i) - 1."
          },
          {
            "id": "s1_15",
            "title": "Pattern 9: Diamond Star Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Adobe"
            ],
            "hint": "Combination of pyramid and inverted pyramid."
          },
          {
            "id": "s1_16",
            "title": "Pattern 10: Half Diamond Star Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "TCS"
            ],
            "hint": "Grow till N then shrink down to 1."
          },
          {
            "id": "s1_17",
            "title": "Pattern 11: Binary Number Triangle Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Wipro"
            ],
            "hint": "Alternate 1 and 0 using parity (i + j) % 2."
          },
          {
            "id": "s1_18",
            "title": "Pattern 12: Number Crown Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Numbers forward, spaces 2*(N-i), numbers backwards."
          },
          {
            "id": "s1_19",
            "title": "Pattern 13: Increasing Number Triangle",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Infosys"
            ],
            "hint": "Maintain global incrementing counter."
          },
          {
            "id": "s1_20",
            "title": "Pattern 14: Increasing Letter Triangle",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Accenture"
            ],
            "hint": "Characters from 'A' to 'A' + j."
          },
          {
            "id": "s1_21",
            "title": "Pattern 15: Reverse Letter Triangle",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "TCS"
            ],
            "hint": "Characters from 'A' up to (N - i)."
          },
          {
            "id": "s1_22",
            "title": "Pattern 16: Alpha-Ramp Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Wipro"
            ],
            "hint": "Repeated character ('A' + i - 1)."
          },
          {
            "id": "s1_23",
            "title": "Pattern 17: Alpha-Hill Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Palindrome character hill with spaces."
          },
          {
            "id": "s1_24",
            "title": "Pattern 18: Alpha-Triangle Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "TCS"
            ],
            "hint": "Start from 'A' + N - 1 moving backwards."
          },
          {
            "id": "s1_25",
            "title": "Pattern 19: Symmetric Void Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Mirrored star brackets with hollow center."
          },
          {
            "id": "s1_26",
            "title": "Pattern 20: Symmetric Butterfly Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Adobe"
            ],
            "hint": "Expanding wings then contracting wings."
          },
          {
            "id": "s1_27",
            "title": "Pattern 21: Hollow Rectangle Pattern",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Cognizant"
            ],
            "hint": "Boundary check: i==0 or i==N-1 or j==0 or j==N-1."
          },
          {
            "id": "s1_28",
            "title": "Pattern 22: Number Spiral Matrix Pattern",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/spiral-matrix-ii/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Value at (i, j) is N - min(i, j, 2*N-2-i, 2*N-2-j)."
          }
        ]
      },
      {
        "name": "Lec 3: C++ STL / Java Collections / Python Structures",
        "problems": [
          {
            "id": "s1_29",
            "title": "Vectors, Lists, Deque & Iterators",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-hashmap/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Dynamic array doubling, capacity vs size, iterators arithmetic."
          },
          {
            "id": "s1_30",
            "title": "Pairs, Sets, MultiSets & Unordered Sets",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/contains-duplicate/",
            "companies": [
              "Amazon"
            ],
            "hint": "Red-Black Tree O(log N) vs Hash Table O(1) avg lookup."
          },
          {
            "id": "s1_31",
            "title": "Maps, MultiMaps, Priority Queues & Sort Comparators",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Google"
            ],
            "hint": "Heapify semantics, custom comparators, and operator overloading."
          }
        ]
      },
      {
        "name": "Lec 4: Know Basic Math",
        "problems": [
          {
            "id": "s1_32",
            "title": "Count Digits in a Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/count-integers-with-even-digit-sum/",
            "companies": [
              "Amazon"
            ],
            "hint": "Use log10(N) + 1 or repeatedly divide by 10."
          },
          {
            "id": "s1_33",
            "title": "Reverse a Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/reverse-integer/",
            "companies": [
              "Apple",
              "Bloomberg"
            ],
            "hint": "Handle 32-bit signed integer overflow bounds before multiplying by 10."
          },
          {
            "id": "s1_34",
            "title": "Check Palindrome Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/palindrome-number/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Negative numbers are never palindromes. Compare reversed half with original half."
          },
          {
            "id": "s1_35",
            "title": "GCD or HCF (Euclidean Algorithm)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
            "companies": [
              "Microsoft"
            ],
            "hint": "gcd(a, b) = gcd(b, a % b) until b becomes 0."
          },
          {
            "id": "s1_36",
            "title": "Armstrong Number Check",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/armstrong-number/",
            "companies": [
              "Infosys"
            ],
            "hint": "Sum of digits each raised to power equal to number of digits."
          },
          {
            "id": "s1_37",
            "title": "Print all Divisors of a given Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/three-divisors/",
            "companies": [
              "Barclays"
            ],
            "hint": "Iterate up to sqrt(N) to collect pairs of factors in O(sqrt(N))."
          },
          {
            "id": "s1_38",
            "title": "Check for Prime Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/count-primes/",
            "companies": [
              "Amazon"
            ],
            "hint": "A prime has exactly 2 distinct factors (1 and itself). Loop up to sqrt(N)."
          }
        ]
      },
      {
        "name": "Lec 5: Learn Basic Recursion",
        "problems": [
          {
            "id": "s1_39",
            "title": "Print 1 to N using Recursion",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/power-of-three/",
            "companies": [
              "TCS"
            ],
            "hint": "Base condition: if n < 1 return; recursive call before printing."
          },
          {
            "id": "s1_40",
            "title": "Print N to 1 using Recursion",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/power-of-two/",
            "companies": [
              "TCS"
            ],
            "hint": "Print n before recursive call with n-1."
          },
          {
            "id": "s1_41",
            "title": "Sum of first N numbers",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/add-digits/",
            "companies": [
              "Cognizant"
            ],
            "hint": "f(n) = n + f(n-1) or parameterized accumulator."
          },
          {
            "id": "s1_42",
            "title": "Factorial of N numbers",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/factorial-trailing-zeroes/",
            "companies": [
              "Amazon"
            ],
            "hint": "Base case f(0)=1, f(1)=1; recurse n * f(n-1)."
          },
          {
            "id": "s1_43",
            "title": "Reverse an Array using Recursion",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/reverse-string/",
            "companies": [
              "Adobe"
            ],
            "hint": "Swap arr[l] and arr[r], recurse on l+1 and r-1."
          },
          {
            "id": "s1_44",
            "title": "Check if a String is Palindrome (Recursive)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/valid-palindrome/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Base condition: if left >= right return true; if s[l] != s[r] return false."
          },
          {
            "id": "s1_45",
            "title": "Fibonacci Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/fibonacci-number/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "f(n) = f(n-1) + f(n-2) with base cases f(0)=0, f(1)=1."
          }
        ]
      },
      {
        "name": "Lec 6: Learn Basic Hashing",
        "problems": [
          {
            "id": "s1_46",
            "title": "Counting Frequencies of Array Elements",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/first-unique-character-in-a-string/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Use unordered_map / HashMap for O(N) average time."
          },
          {
            "id": "s1_47",
            "title": "Find the Highest / Lowest Frequency Element",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/top-k-frequent-elements/",
            "companies": [
              "Google"
            ],
            "hint": "Single traversal over map entries tracking min and max counts."
          }
        ]
      }
    ]
  },
  {
    "step": 2,
    "title": "Step 2: Learn Important Sorting Techniques",
    "description": "Comparison-based and divide & conquer sorting algorithms.",
    "topics": [
      {
        "name": "Lec 1: Sorting-I (Elementary Sorts)",
        "problems": [
          {
            "id": "s2_1",
            "title": "Selection Sort",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Infosys"
            ],
            "hint": "Find the minimum in unsorted subarray and swap to front. O(N^2)."
          },
          {
            "id": "s2_2",
            "title": "Bubble Sort",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Wipro"
            ],
            "hint": "Repeatedly swap adjacent inverted pairs. Optimize with swapped flag."
          },
          {
            "id": "s2_3",
            "title": "Insertion Sort",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/insertion-sort-list/",
            "companies": [
              "TCS"
            ],
            "hint": "Take element and place it in its correct relative position in sorted part."
          }
        ]
      },
      {
        "name": "Lec 2: Sorting-II (Divide & Conquer Sorts)",
        "problems": [
          {
            "id": "s2_4",
            "title": "Merge Sort",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Morgan Stanley"
            ],
            "hint": "Divide array into halves, recursively sort, and merge in O(N log N) stable time."
          },
          {
            "id": "s2_5",
            "title": "Recursive Bubble Sort",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Cognizant"
            ],
            "hint": "One pass to bubble largest to end, recurse on remaining n-1 elements."
          },
          {
            "id": "s2_6",
            "title": "Recursive Insertion Sort",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/insertion-sort-list/",
            "companies": [
              "TCS"
            ],
            "hint": "Sort first n-1 elements recursively, then insert nth element in position."
          },
          {
            "id": "s2_7",
            "title": "Quick Sort",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Google",
              "Amazon",
              "Barclays"
            ],
            "hint": "Partition around a pivot placing pivot in correct index. O(N log N) avg."
          }
        ]
      }
    ]
  },
  {
    "step": 3,
    "title": "Step 3: Solve Problems on Arrays [Easy -> Medium -> Hard]",
    "description": "The foundational bedrock of campus technical interviews & online assessments.",
    "topics": [
      {
        "name": "Lec 1: Arrays - Easy",
        "problems": [
          {
            "id": "s3_1",
            "title": "Largest Element in an Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/third-maximum-number/",
            "companies": [
              "TCS",
              "Accenture"
            ],
            "hint": "Single pass maintaining max_val."
          },
          {
            "id": "s3_2",
            "title": "Second Largest Element in an Array without sorting",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Morgan Stanley"
            ],
            "hint": "Keep track of largest and second_largest in single pass O(N)."
          },
          {
            "id": "s3_3",
            "title": "Check if the Array is Sorted and Rotated",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Count how many times arr[i] > arr[i+1]. It can happen at most once."
          },
          {
            "id": "s3_4",
            "title": "Remove Duplicates from Sorted Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Two pointers: index i marks unique boundary, j scans ahead."
          },
          {
            "id": "s3_5",
            "title": "Left Rotate Array by One Place",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/rotate-array/",
            "companies": [
              "Infosys"
            ],
            "hint": "Store first element in temp, shift arr[1..N-1] left by 1, assign temp to end."
          },
          {
            "id": "s3_6",
            "title": "Rotate Array to Left by K Places",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/rotate-array/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Reverse first k, reverse remaining, reverse whole array in O(1) space."
          },
          {
            "id": "s3_7",
            "title": "Move Zeroes to End",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/move-zeroes/",
            "companies": [
              "Facebook",
              "Bloomberg"
            ],
            "hint": "Two pointers: swap non-zero elements to j-th position."
          },
          {
            "id": "s3_8",
            "title": "Linear Search",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-insert-position/",
            "companies": [
              "TCS"
            ],
            "hint": "Iterate sequentially through array and return index if target matches."
          },
          {
            "id": "s3_9",
            "title": "Find the Union of Two Sorted Arrays",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/intersection-of-two-arrays/",
            "companies": [
              "Amazon"
            ],
            "hint": "Two pointers on both arrays, picking smaller and advancing, avoiding duplicates."
          },
          {
            "id": "s3_10",
            "title": "Find the Intersection of Two Sorted Arrays",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Two pointers: if equal, add to result; advance pointer with smaller value."
          },
          {
            "id": "s3_11",
            "title": "Find the Missing Number in an Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/missing-number/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "XOR all elements 0..N with array elements or use N*(N+1)/2."
          },
          {
            "id": "s3_12",
            "title": "Max Consecutive Ones",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/max-consecutive-ones/",
            "companies": [
              "Google"
            ],
            "hint": "Keep a running count, reset when 0 seen, update max."
          },
          {
            "id": "s3_13",
            "title": "Find the number that appears once (Single Number)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/single-number/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "XOR of a number with itself is 0: a ^ a = 0."
          },
          {
            "id": "s3_14",
            "title": "Longest Subarray with given Sum K (Positives)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Two pointers sliding window: shrink left pointer when current sum exceeds K."
          }
        ]
      },
      {
        "name": "Lec 2: Arrays - Medium",
        "problems": [
          {
            "id": "s3_15",
            "title": "2 Sum Problem",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/two-sum/",
            "companies": [
              "Amazon",
              "Google",
              "Morgan Stanley",
              "Microsoft"
            ],
            "hint": "Use hash map storing complement (target - num) and index in O(N)."
          },
          {
            "id": "s3_16",
            "title": "Sort an array of 0s, 1s and 2s (Dutch National Flag)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-colors/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Goldman Sachs"
            ],
            "hint": "Three pointers: low, mid, high. Process mid until it crosses high."
          },
          {
            "id": "s3_17",
            "title": "Majority Element (>N/2 times - Moore's Voting)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/majority-element/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Boyer-Moore voting algorithm: maintain candidate and count in O(1) space."
          },
          {
            "id": "s3_18",
            "title": "Maximum Subarray Sum (Kadane's Algorithm)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-subarray/",
            "companies": [
              "Amazon",
              "Microsoft",
              "JP Morgan"
            ],
            "hint": "sum += arr[i]; max_sum = max(max_sum, sum); if sum < 0 sum = 0."
          },
          {
            "id": "s3_19",
            "title": "Print Subarray with Maximum Subarray Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-subarray/",
            "companies": [
              "Amazon"
            ],
            "hint": "Record start and end index whenever a new max_sum is updated."
          },
          {
            "id": "s3_20",
            "title": "Best Time to Buy and Sell Stock",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            "companies": [
              "Amazon",
              "TCS Digital",
              "Barclays"
            ],
            "hint": "Track lowest buy price seen so far and compute profit at current price."
          },
          {
            "id": "s3_21",
            "title": "Rearrange Array Elements by Sign",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
            "companies": [
              "Amazon"
            ],
            "hint": "Place positives at even indices (0, 2, 4...) and negatives at odd indices (1, 3...)."
          },
          {
            "id": "s3_22",
            "title": "Next Permutation",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/next-permutation/",
            "companies": [
              "Google",
              "Facebook",
              "Microsoft"
            ],
            "hint": "Find breakpoint from right, swap with just-greater element, reverse suffix."
          },
          {
            "id": "s3_23",
            "title": "Leaders in an Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/",
            "companies": [
              "Amazon",
              "Adobe"
            ],
            "hint": "Traverse from right to left keeping track of maximum seen so far."
          },
          {
            "id": "s3_24",
            "title": "Longest Consecutive Sequence",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-consecutive-sequence/",
            "companies": [
              "Amazon",
              "Google",
              "Spotify"
            ],
            "hint": "Insert into HashSet. Only start count if (num - 1) is not in set for O(N)."
          },
          {
            "id": "s3_25",
            "title": "Set Matrix Zeroes",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/set-matrix-zeroes/",
            "companies": [
              "Microsoft",
              "Amazon",
              "Apple"
            ],
            "hint": "Use first row and first column as markers to achieve O(1) extra space."
          },
          {
            "id": "s3_26",
            "title": "Rotate Image by 90 degrees",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/rotate-image/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Transpose matrix (swap matrix[i][j] with matrix[j][i]) and reverse each row."
          },
          {
            "id": "s3_27",
            "title": "Spiral Matrix Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/spiral-matrix/",
            "companies": [
              "Microsoft",
              "Apple"
            ],
            "hint": "Four boundary pointers: top, bottom, left, right. Traverse boundaries and shrink."
          },
          {
            "id": "s3_28",
            "title": "Count Subarrays with Given Sum K",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "companies": [
              "Google",
              "Facebook"
            ],
            "hint": "Prefix sum with hash map: count occurrences of (prefix_sum - K)."
          }
        ]
      },
      {
        "name": "Lec 3: Arrays - Hard",
        "problems": [
          {
            "id": "s3_29",
            "title": "Pascal's Triangle",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/pascals-triangle/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "Each row can be computed using combinations or previous row elements."
          },
          {
            "id": "s3_30",
            "title": "Majority Element II (>N/3 times)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/majority-element-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Extended Boyer-Moore with at most 2 candidate elements."
          },
          {
            "id": "s3_31",
            "title": "3 Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/3sum/",
            "companies": [
              "Amazon",
              "Google",
              "Morgan Stanley"
            ],
            "hint": "Sort array, fix first number, two pointers for remaining pair. Skip duplicates."
          },
          {
            "id": "s3_32",
            "title": "4 Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/4sum/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "Sort array, two nested loops fixing first 2 elements, two pointers for last 2."
          },
          {
            "id": "s3_33",
            "title": "Largest Subarray with 0 Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/contiguous-array/",
            "companies": [
              "Amazon",
              "MakeMyTrip"
            ],
            "hint": "Prefix sum with hash map: if prefix sum repeats, subarray between has sum 0."
          },
          {
            "id": "s3_34",
            "title": "Count number of subarrays with given XOR K",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/xor-queries-of-a-subarray/",
            "companies": [
              "Amazon",
              "DE Shaw"
            ],
            "hint": "XR ^ x = K -> x = XR ^ K. Map prefix XOR frequencies."
          },
          {
            "id": "s3_35",
            "title": "Merge Overlapping Subintervals",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/merge-intervals/",
            "companies": [
              "Google",
              "Microsoft",
              "JP Morgan"
            ],
            "hint": "Sort by start time. Merge with last interval if curr.start <= last.end."
          },
          {
            "id": "s3_36",
            "title": "Merge Two Sorted Arrays Without Extra Space",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/merge-sorted-array/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Gap method (derived from Shell Sort) or backward merge pointers."
          },
          {
            "id": "s3_37",
            "title": "Find the Missing and Repeating Number",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/set-mismatch/",
            "companies": [
              "Amazon"
            ],
            "hint": "Use math equations: Sum(1..N) - Sum(arr) and Sum_sq(1..N) - Sum_sq(arr)."
          },
          {
            "id": "s3_38",
            "title": "Count Inversions in an Array",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/global-and-local-inversions/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Modified Merge Sort: when picking right element in merge, add (mid - i + 1)."
          },
          {
            "id": "s3_39",
            "title": "Reverse Pairs",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/reverse-pairs/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Merge Sort variation: count pairs where arr[i] > 2*arr[j] before merging."
          },
          {
            "id": "s3_40",
            "title": "Maximum Product Subarray",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-product-subarray/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Google"
            ],
            "hint": "Maintain current max and current min due to negative product flips."
          }
        ]
      }
    ]
  },
  {
    "step": 4,
    "title": "Step 4: Binary Search [1D, 2D Arrays, Search Space]",
    "description": "Binary search on arrays and monotonic answer search spaces.",
    "topics": [
      {
        "name": "Lec 1: BS on 1D Arrays",
        "problems": [
          {
            "id": "s4_1",
            "title": "Binary Search to find X in sorted array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/binary-search/",
            "companies": [
              "Google"
            ],
            "hint": "mid = low + (high - low)/2 to prevent integer overflow."
          },
          {
            "id": "s4_2",
            "title": "Implement Lower Bound",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-insert-position/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Smallest index where arr[i] >= target."
          },
          {
            "id": "s4_3",
            "title": "Implement Upper Bound",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-insert-position/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Smallest index where arr[i] > target."
          },
          {
            "id": "s4_4",
            "title": "Search Insert Position",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-insert-position/",
            "companies": [
              "Google"
            ],
            "hint": "Equivalent to lower bound."
          },
          {
            "id": "s4_5",
            "title": "Check if for Floor and Ceil in Sorted Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-insert-position/",
            "companies": [
              "Amazon"
            ],
            "hint": "Floor: largest element <= target; Ceil: smallest element >= target."
          },
          {
            "id": "s4_6",
            "title": "Find the First or Last Occurrence of a given Number",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Run binary search twice: once bias left (high = mid - 1), once bias right."
          },
          {
            "id": "s4_7",
            "title": "Count Occurrences of a number in a sorted array with duplicates",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            "companies": [
              "TCS"
            ],
            "hint": "Occurrences = last_occurrence - first_occurrence + 1."
          },
          {
            "id": "s4_8",
            "title": "Search in Rotated Sorted Array I (Unique Elements)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            "companies": [
              "Amazon",
              "Google",
              "Microsoft"
            ],
            "hint": "Identify which half is sorted, check if target lies within that sorted range."
          },
          {
            "id": "s4_9",
            "title": "Search in Rotated Sorted Array II (With Duplicates)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "If arr[low] == arr[mid] == arr[high], shrink search space: low++, high--."
          },
          {
            "id": "s4_10",
            "title": "Find Minimum in Rotated Sorted Array",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "If arr[mid] > arr[high], min lies in right half: low = mid + 1."
          },
          {
            "id": "s4_11",
            "title": "Find out how many times array has been rotated",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Rotation count is the index of the minimum element in rotated sorted array."
          },
          {
            "id": "s4_12",
            "title": "Single Element in a Sorted Array",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Index parity: before single element, 1st occurrence even, 2nd odd. Flip on right."
          },
          {
            "id": "s4_13",
            "title": "Find Peak Element",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-peak-element/",
            "companies": [
              "Google",
              "Facebook"
            ],
            "hint": "If arr[mid] < arr[mid+1], a peak must exist in right half."
          }
        ]
      },
      {
        "name": "Lec 2: BS on Answers",
        "problems": [
          {
            "id": "s4_14",
            "title": "Find Square Root of an Integer (Integral Part)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/sqrtx/",
            "companies": [
              "Apple",
              "Bloomberg"
            ],
            "hint": "BS in range [1, N]: check if mid * mid <= N."
          },
          {
            "id": "s4_15",
            "title": "Find the Nth root of an Integer",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/powx-n/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Search space [1, M]: mid^N == M in O(N log M)."
          },
          {
            "id": "s4_16",
            "title": "Koko Eating Bananas",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/koko-eating-bananas/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Search space [1, max(piles)]. Check total hours needed at eating speed mid."
          },
          {
            "id": "s4_17",
            "title": "Minimum Days to Make M Bouquets",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
            "companies": [
              "Amazon"
            ],
            "hint": "Monotonic check function counting adjacent bloomed flowers."
          },
          {
            "id": "s4_18",
            "title": "Find the Smallest Divisor Given a Threshold",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
            "companies": [
              "Airbnb"
            ],
            "hint": "Search range [1, max_val]: sum(ceil(arr[i]/mid)) <= threshold."
          },
          {
            "id": "s4_19",
            "title": "Capacity to Ship Packages Within D Days",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Range [max(weights), sum(weights)]. Verify if capacity mid can ship in <= D days."
          },
          {
            "id": "s4_20",
            "title": "Kth Missing Positive Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/kth-missing-positive-number/",
            "companies": [
              "Facebook"
            ],
            "hint": "Missing count before arr[mid] is arr[mid] - (mid + 1)."
          },
          {
            "id": "s4_21",
            "title": "Aggressive Cows (Maximum Minimum Distance)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
            "companies": [
              "Google"
            ],
            "hint": "Sort coordinates. Can we place C cows with minimum distance >= mid?"
          },
          {
            "id": "s4_22",
            "title": "Book Allocation Problem",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/split-array-largest-sum/",
            "companies": [
              "Google",
              "Microsoft"
            ],
            "hint": "Search space [max(pages), sum(pages)]. Count students needed with max allocation mid."
          },
          {
            "id": "s4_23",
            "title": "Split Array Largest Sum",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/split-array-largest-sum/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Exact isomorphic problem to Book Allocation and Painter's Partition."
          },
          {
            "id": "s4_24",
            "title": "Painter's Partition Problem",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/split-array-largest-sum/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Binary search on max work assigned to any painter."
          },
          {
            "id": "s4_25",
            "title": "Minimize Max Distance to Gas Station",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/",
            "companies": [
              "Google"
            ],
            "hint": "Binary search on floating answer: how many additional stations needed for gap mid?"
          },
          {
            "id": "s4_26",
            "title": "Median of Two Sorted Arrays",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            "companies": [
              "Google",
              "Amazon",
              "Microsoft",
              "Apple"
            ],
            "hint": "Binary search on partition cut of smaller array: ensure l1<=r2 and l2<=r1."
          },
          {
            "id": "s4_27",
            "title": "Kth Element of Two Sorted Arrays",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            "companies": [
              "Morgan Stanley",
              "Google"
            ],
            "hint": "Partition smaller array such that exactly K elements lie on left."
          }
        ]
      },
      {
        "name": "Lec 3: BS on 2D Matrices",
        "problems": [
          {
            "id": "s4_28",
            "title": "Find the row with maximum number of 1's",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/row-with-maximum-ones/",
            "companies": [
              "Amazon"
            ],
            "hint": "For each row, first occurrence of 1 gives count in N*log(M)."
          },
          {
            "id": "s4_29",
            "title": "Search in a 2D Matrix I",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/search-a-2d-matrix/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Treat 2D matrix as flattened 1D array: row = mid / m, col = mid % m."
          },
          {
            "id": "s4_30",
            "title": "Search in a 2D Matrix II",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Start at top-right corner. If target < val go left, if target > val go down."
          },
          {
            "id": "s4_31",
            "title": "Find a Peak Element II (in 2D Matrix)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/find-a-peak-element-ii/",
            "companies": [
              "Google"
            ],
            "hint": "Find max element in middle column, compare with left and right neighbors."
          },
          {
            "id": "s4_32",
            "title": "Matrix Median in Row-Wise Sorted Matrix",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
            "companies": [
              "Amazon"
            ],
            "hint": "Binary search in range [min_val, max_val]: count elements <= mid across rows."
          }
        ]
      }
    ]
  },
  {
    "step": 5,
    "title": "Step 5: Strings [Basic & Medium]",
    "description": "Pattern searching, palindromes, and frequency manipulations.",
    "topics": [
      {
        "name": "Lec 1: Basic and Easy String Problems",
        "problems": [
          {
            "id": "s5_1",
            "title": "Remove Outermost Parentheses",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/remove-outermost-parentheses/",
            "companies": [
              "Google"
            ],
            "hint": "Keep open bracket count; omit adding '(' if count was 0 and ')' if count becomes 0."
          },
          {
            "id": "s5_2",
            "title": "Reverse Words in a String",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/reverse-words-in-a-string/",
            "companies": [
              "Microsoft",
              "Amazon"
            ],
            "hint": "Split by spaces, ignore extra whitespace, reverse tokens."
          },
          {
            "id": "s5_3",
            "title": "Largest Odd Number in String",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/largest-odd-number-in-string/",
            "companies": [
              "Amazon"
            ],
            "hint": "Scan from right to left to find first odd digit; return prefix."
          },
          {
            "id": "s5_4",
            "title": "Longest Common Prefix",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/longest-common-prefix/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "Sort strings and compare only first and last string characters."
          },
          {
            "id": "s5_5",
            "title": "Isomorphic Strings",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/isomorphic-strings/",
            "companies": [
              "Amazon",
              "LinkedIn"
            ],
            "hint": "Bi-directional mapping check using two hash maps or 256-sized arrays."
          },
          {
            "id": "s5_6",
            "title": "Rotate String (Check if String is Rotated)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/rotate-string/",
            "companies": [
              "Microsoft"
            ],
            "hint": "s.length == goal.length and (s + s).contains(goal)."
          },
          {
            "id": "s5_7",
            "title": "Valid Anagram",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/valid-anagram/",
            "companies": [
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Frequency array of size 26: increment for s, decrement for t."
          }
        ]
      },
      {
        "name": "Lec 2: Medium String Problems",
        "problems": [
          {
            "id": "s5_8",
            "title": "Sort Characters by Frequency",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-characters-by-frequency/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Bucket sort or max-heap on character frequency count."
          },
          {
            "id": "s5_9",
            "title": "Maximum Nesting Depth of Parentheses",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
            "companies": [
              "Facebook"
            ],
            "hint": "Track current depth (+1 for '(', -1 for ')') and keep max."
          },
          {
            "id": "s5_10",
            "title": "Roman to Integer",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/roman-to-integer/",
            "companies": [
              "Microsoft",
              "Apple"
            ],
            "hint": "If current value < next value, subtract current value; otherwise add."
          },
          {
            "id": "s5_11",
            "title": "Integer to Roman",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/integer-to-roman/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Greedy subtraction with value-symbol mapping table from 1000 down to 1."
          },
          {
            "id": "s5_12",
            "title": "String to Integer (atoi)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/string-to-integer-atoi/",
            "companies": [
              "Microsoft",
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Handle whitespaces, sign symbol, digit parsing, and 32-bit clamp bounds."
          },
          {
            "id": "s5_13",
            "title": "Count Number of Substrings with K Distinct Characters",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
            "companies": [
              "Amazon"
            ],
            "hint": "exactly(K) = atMost(K) - atMost(K-1) using sliding window."
          },
          {
            "id": "s5_14",
            "title": "Longest Palindromic Substring",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-palindromic-substring/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Google"
            ],
            "hint": "Expand around center for each index (both odd and even length centers)."
          },
          {
            "id": "s5_15",
            "title": "Sum of Beauty of All Substrings",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/",
            "companies": [
              "Google"
            ],
            "hint": "For each starting index i, expand j and maintain character frequency array."
          }
        ]
      }
    ]
  },
  {
    "step": 6,
    "title": "Step 6: Learn LinkedList [Single, Double, Medium, Hard]",
    "description": "Pointer manipulation, cycle detection, reordering, and caching structures.",
    "topics": [
      {
        "name": "Lec 1: Learn 1D LinkedList",
        "problems": [
          {
            "id": "s6_1",
            "title": "Introduction to LinkedList: Node Structure",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-linked-list/",
            "companies": [
              "Infosys"
            ],
            "hint": "Value and next pointer representation in memory."
          },
          {
            "id": "s6_2",
            "title": "Inserting a node in LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-linked-list/",
            "companies": [
              "TCS"
            ],
            "hint": "Head insertion, tail insertion, and position K insertion."
          },
          {
            "id": "s6_3",
            "title": "Deleting a node in LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
            "companies": [
              "Amazon"
            ],
            "hint": "Copy next node's value and bypass next node: node.val = node.next.val."
          },
          {
            "id": "s6_4",
            "title": "Find the length of the LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/middle-of-the-linked-list/",
            "companies": [
              "Wipro"
            ],
            "hint": "Traverse until curr != null and maintain counter."
          },
          {
            "id": "s6_5",
            "title": "Search an element in the LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/middle-of-the-linked-list/",
            "companies": [
              "Accenture"
            ],
            "hint": "Linear traversal comparing node.val with target."
          }
        ]
      },
      {
        "name": "Lec 2: Learn Doubly LinkedList",
        "problems": [
          {
            "id": "s6_6",
            "title": "Introduction to Doubly LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-linked-list/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Node with prev, next, and value pointers."
          },
          {
            "id": "s6_7",
            "title": "Insert a node in Doubly LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-linked-list/",
            "companies": [
              "Amazon"
            ],
            "hint": "Update both forward (next) and backward (prev) links."
          },
          {
            "id": "s6_8",
            "title": "Delete a node in Doubly LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
            "companies": [
              "Amazon"
            ],
            "hint": "node.prev.next = node.next; if (node.next) node.next.prev = node.prev."
          },
          {
            "id": "s6_9",
            "title": "Reverse a Doubly LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/reverse-linked-list-ii/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Swap prev and next pointers for each node."
          }
        ]
      },
      {
        "name": "Lec 3: Medium Problems of LL",
        "problems": [
          {
            "id": "s6_10",
            "title": "Middle of the LinkedList (Tortoise-Hare)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/middle-of-the-linked-list/",
            "companies": [
              "Amazon",
              "Adobe"
            ],
            "hint": "Slow pointer advances 1 step, fast advances 2 steps. When fast ends, slow is middle."
          },
          {
            "id": "s6_11",
            "title": "Reverse a LinkedList (Iterative)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
            "companies": [
              "Amazon",
              "Google",
              "Microsoft"
            ],
            "hint": "Prev = null, curr = head. Save next, curr.next = prev, prev = curr, curr = next."
          },
          {
            "id": "s6_12",
            "title": "Reverse a LinkedList (Recursive)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
            "companies": [
              "Apple"
            ],
            "hint": "Recurse on head.next: newHead = reverse(head.next); head.next.next = head; head.next = null."
          },
          {
            "id": "s6_13",
            "title": "Detect a Loop in LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/linked-list-cycle/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Barclays"
            ],
            "hint": "Floyd's Cycle: if slow == fast, loop detected."
          },
          {
            "id": "s6_14",
            "title": "Find the length of Loop in LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/linked-list-cycle/",
            "companies": [
              "Barclays"
            ],
            "hint": "Keep fast at collision point; advance slow until it returns, counting steps."
          },
          {
            "id": "s6_15",
            "title": "Find the starting point of the Loop",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/linked-list-cycle-ii/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "After collision, reset slow to head. Move both 1 step; meeting node is start."
          },
          {
            "id": "s6_16",
            "title": "Check if LinkedList is Palindrome",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/palindrome-linked-list/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "Find middle, reverse second half, compare node by node, restore."
          },
          {
            "id": "s6_17",
            "title": "Segregate odd and even nodes in LL",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/odd-even-linked-list/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Connect odd nodes together and even nodes together, link odd.tail to evenHead."
          },
          {
            "id": "s6_18",
            "title": "Remove Nth Node from End of List",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "Fast pointer moves N steps ahead. Move slow and fast together until fast reaches end."
          },
          {
            "id": "s6_19",
            "title": "Delete the Middle Node of a LinkedList",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
            "companies": [
              "Amazon"
            ],
            "hint": "Fast moves 2, slow moves 1. Keep prev pointer to bypass slow node."
          },
          {
            "id": "s6_20",
            "title": "Sort a LinkedList",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-list/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Merge Sort: find middle, split, recursively sort, mergeTwoSortedLists."
          },
          {
            "id": "s6_21",
            "title": "Sort a LL of 0's 1's and 2's by changing links",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-colors/",
            "companies": [
              "MakeMyTrip"
            ],
            "hint": "Maintain three dummy heads: zeroHead, oneHead, twoHead; connect them."
          },
          {
            "id": "s6_22",
            "title": "Find the Intersection point of Y LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "When pointer A reaches null redirect to headB; when B reaches null redirect to headA."
          },
          {
            "id": "s6_23",
            "title": "Add 1 to a number represented by LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/plus-one-linked-list/",
            "companies": [
              "Amazon"
            ],
            "hint": "Reverse list, add 1 with carry, reverse back (or recursive return carry)."
          },
          {
            "id": "s6_24",
            "title": "Add Two Numbers Represented by LinkedList",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/add-two-numbers/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Bloomberg"
            ],
            "hint": "Dummy head node, maintain carry = sum / 10 across additions."
          }
        ]
      },
      {
        "name": "Lec 4: Hard Problems of LL",
        "problems": [
          {
            "id": "s6_25",
            "title": "Reverse Nodes in k-Group",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Google"
            ],
            "hint": "Count k nodes; if available, reverse that group and recursively link to next."
          },
          {
            "id": "s6_26",
            "title": "Rotate a LinkedList",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/rotate-list/",
            "companies": [
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Make list circular: length L, connect tail to head, cut at (L - k % L)."
          },
          {
            "id": "s6_27",
            "title": "Flattening of a LinkedList",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Recursively merge right list with flattened bottom list using merge 2 sorted lists."
          },
          {
            "id": "s6_28",
            "title": "Merge k Sorted Lists",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/merge-k-sorted-lists/",
            "companies": [
              "Amazon",
              "Google",
              "Facebook"
            ],
            "hint": "Min-heap priority queue storing list node heads in O(N log k)."
          },
          {
            "id": "s6_29",
            "title": "Clone a LinkedList with Next and Random Pointer",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Interweave copy nodes between originals, copy random links, then detach."
          },
          {
            "id": "s6_30",
            "title": "LRU Cache (Least Recently Used)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/lru-cache/",
            "companies": [
              "Amazon",
              "Google",
              "Microsoft",
              "Morgan Stanley"
            ],
            "hint": "HashMap mapping key to Doubly LinkedList Node for O(1) get and put."
          },
          {
            "id": "s6_31",
            "title": "LFU Cache (Least Frequently Used)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/lfu-cache/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Two hash maps: key-to-node and frequency-to-doublyLinkedList, minFreq tracker."
          }
        ]
      }
    ]
  },
  {
    "step": 7,
    "title": "Step 7: Recursion & Backtracking",
    "description": "Decision trees, exhaustive search, and combinatorial generation.",
    "topics": [
      {
        "name": "Lec 1: Get a Strong Hold",
        "problems": [
          {
            "id": "s7_1",
            "title": "Recursive Implementation of Pow(x, n)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/powx-n/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Binary exponentiation: if n is even x^(n/2)*x^(n/2), if odd x * x^(n-1)."
          },
          {
            "id": "s7_2",
            "title": "Count Good Numbers",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-good-numbers/",
            "companies": [
              "Amazon"
            ],
            "hint": "Even indices (5 choices), odd indices (4 choices, primes: 2,3,5,7). Modular pow."
          },
          {
            "id": "s7_3",
            "title": "Sort a Stack using Recursion",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Pop top, recursively sort remaining stack, insert in sorted stack."
          },
          {
            "id": "s7_4",
            "title": "Reverse a Stack using Recursion",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/reverse-string/",
            "companies": [
              "Amazon"
            ],
            "hint": "Pop top, reverse remaining, insertAtBottom."
          },
          {
            "id": "s7_5",
            "title": "Generate all Binary Strings without consecutive 1's",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/",
            "companies": [
              "Google"
            ],
            "hint": "Recurse adding '0' always; add '1' only if previous was '0'."
          }
        ]
      },
      {
        "name": "Lec 2: Subsequences Pattern",
        "problems": [
          {
            "id": "s7_6",
            "title": "Generate Parentheses",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/generate-parentheses/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Add '(' if open < n, add ')' if close < open."
          },
          {
            "id": "s7_7",
            "title": "Print all Subsequences / Power Set",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subsets/",
            "companies": [
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Pick or don't pick at each index, or bit manipulation (0 to 2^n - 1)."
          },
          {
            "id": "s7_8",
            "title": "Subsets II (Unique Subsets with Duplicates)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subsets-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Sort array. Skip duplicate branches: if (i > start && arr[i] == arr[i-1]) continue."
          },
          {
            "id": "s7_9",
            "title": "Combination Sum I",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/combination-sum/",
            "companies": [
              "Amazon",
              "Airbnb"
            ],
            "hint": "Element can be picked multiple times: stay on same index on pick."
          },
          {
            "id": "s7_10",
            "title": "Combination Sum II",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/combination-sum-ii/",
            "companies": [
              "Amazon"
            ],
            "hint": "Each element picked at most once. Sort and skip duplicate siblings."
          },
          {
            "id": "s7_11",
            "title": "Combination Sum III",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/combination-sum-iii/",
            "companies": [
              "Google"
            ],
            "hint": "Combinations of k numbers that add up to n using numbers 1 to 9."
          },
          {
            "id": "s7_12",
            "title": "Letter Combinations of a Phone Number",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
            "companies": [
              "Amazon",
              "Google",
              "Facebook"
            ],
            "hint": "Digit keypad string mapping, branch on each character."
          },
          {
            "id": "s7_13",
            "title": "Check if there exists a Subsequence with Sum K",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "companies": [
              "Amazon"
            ],
            "hint": "Return true on base case if sum == K; return pick || notPick."
          },
          {
            "id": "s7_14",
            "title": "Count all Subsequences with Sum K",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "companies": [
              "Amazon"
            ],
            "hint": "Return (pickCount + notPickCount). Base: target == 0 count 1."
          },
          {
            "id": "s7_15",
            "title": "Subset Sum I",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subsets/",
            "companies": [
              "Amazon"
            ],
            "hint": "Return sorted list of all subset sums."
          },
          {
            "id": "s7_16",
            "title": "Partition to K Equal Sum Subsets",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Backtracking with bucket sums; target = total / k."
          },
          {
            "id": "s7_17",
            "title": "Palindrome Partitioning",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/palindrome-partitioning/",
            "companies": [
              "Amazon",
              "Google",
              "Bloomberg"
            ],
            "hint": "Loop partition cut: if prefix is palindrome, recurse on suffix."
          }
        ]
      },
      {
        "name": "Lec 3: Hard Backtracking",
        "problems": [
          {
            "id": "s7_18",
            "title": "Word Search in Grid",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/word-search/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "DFS in 4 directions. Mark visited by changing board[i][j] temporarily."
          },
          {
            "id": "s7_19",
            "title": "N-Queens",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/n-queens/",
            "companies": [
              "Google",
              "Amazon",
              "Microsoft"
            ],
            "hint": "Place queen row by row. Use hash sets for col, left diag, right diag."
          },
          {
            "id": "s7_20",
            "title": "Sudoku Solver",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/sudoku-solver/",
            "companies": [
              "Microsoft",
              "Uber",
              "Amazon"
            ],
            "hint": "Find empty cell '.', try digits 1..9, validate row, col, and 3x3 box."
          },
          {
            "id": "s7_21",
            "title": "M-Coloring Problem",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/flower-planting-with-no-adjacent/",
            "companies": [
              "Amazon"
            ],
            "hint": "Assign color 1..M to vertex; check if adjacent vertices share color."
          },
          {
            "id": "s7_22",
            "title": "Rat in a Maze",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/unique-paths-iii/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "D-L-R-U alphabetical order, mark visited cells, unmark on backtrack."
          },
          {
            "id": "s7_23",
            "title": "Word Break (Recursive / Backtracking)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/word-break/",
            "companies": [
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Check if prefix exists in dictionary; recurse on remaining substring."
          },
          {
            "id": "s7_24",
            "title": "Expression Add Operators",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/expression-add-operators/",
            "companies": [
              "Facebook",
              "Google"
            ],
            "hint": "Track previous operand to handle multiplication precedence: eval - prev + prev * curr."
          },
          {
            "id": "s7_25",
            "title": "Permutations I",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/permutations/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Google"
            ],
            "hint": "Swap arr[i] with arr[idx] for each i from idx to N-1."
          }
        ]
      }
    ]
  },
  {
    "step": 8,
    "title": "Step 8: Bit Manipulation [Basics, Interview Problems, Advanced]",
    "description": "Bitwise operators, masks, bit hacks, and binary arithmetic.",
    "topics": [
      {
        "name": "Lec 1: Learn Bit Manipulation",
        "problems": [
          {
            "id": "s8_1",
            "title": "Introduction to Bit Manipulation",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "TCS"
            ],
            "hint": "AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), Right Shift (>>)."
          },
          {
            "id": "s8_2",
            "title": "Check if the i-th bit is set or not",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "Amazon"
            ],
            "hint": "Using left shift: (N & (1 << i)) != 0 or right shift: ((N >> i) & 1) == 1."
          },
          {
            "id": "s8_3",
            "title": "Set the i-th bit",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "Microsoft"
            ],
            "hint": "N | (1 << i)."
          },
          {
            "id": "s8_4",
            "title": "Clear the i-th bit",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "Microsoft"
            ],
            "hint": "N & ~(1 << i)."
          },
          {
            "id": "s8_5",
            "title": "Toggle the i-th bit",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "Amazon"
            ],
            "hint": "N ^ (1 << i)."
          },
          {
            "id": "s8_6",
            "title": "Remove the last set bit (rightmost set bit)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "Google"
            ],
            "hint": "N & (N - 1) turns off the lowest set bit."
          },
          {
            "id": "s8_7",
            "title": "Check if a number is a power of 2",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/power-of-two/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "N > 0 and (N & (N - 1)) == 0."
          },
          {
            "id": "s8_8",
            "title": "Count the number of set bits (Brian Kernighan)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
            "companies": [
              "Apple",
              "Amazon"
            ],
            "hint": "While N > 0: N = N & (N - 1), count++."
          }
        ]
      },
      {
        "name": "Lec 2: Interview Problems",
        "problems": [
          {
            "id": "s8_9",
            "title": "Minimum Bit Flips to Convert Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
            "companies": [
              "Amazon"
            ],
            "hint": "Count set bits of (start ^ goal)."
          },
          {
            "id": "s8_10",
            "title": "Single Number I (Unique among pairs)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/single-number/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "XOR all elements: a ^ a = 0; remaining value is unique."
          },
          {
            "id": "s8_11",
            "title": "Single Number II (Every element appears thrice except one)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/single-number-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Bitwise modulo 3 on each bit position, or (ones, twos) state machine."
          },
          {
            "id": "s8_12",
            "title": "Single Number III (Two numbers appear once)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/single-number-iii/",
            "companies": [
              "Amazon"
            ],
            "hint": "XOR all: diff = a ^ b. Find rightmost set bit diff & (-diff). Divide into 2 groups."
          },
          {
            "id": "s8_13",
            "title": "Find XOR of numbers from L to R",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/xor-queries-of-a-subarray/",
            "companies": [
              "Google"
            ],
            "hint": "XOR(1..N) repeats modulo 4 pattern: [N, 1, N+1, 0]. XOR(L..R) = XOR(R) ^ XOR(L-1)."
          }
        ]
      },
      {
        "name": "Lec 3: Advanced Maths",
        "problems": [
          {
            "id": "s8_14",
            "title": "Print Prime Factors of a Number",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/distinct-prime-factors-of-product-of-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Trial division up to sqrt(N). Divide out 2, then step by 2 through odd numbers."
          },
          {
            "id": "s8_15",
            "title": "All Divisors of a Natural Number",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/three-divisors/",
            "companies": [
              "TCS"
            ],
            "hint": "Collect i and N/i for each i up to sqrt(N)."
          },
          {
            "id": "s8_16",
            "title": "Sieve of Eratosthenes (Primes up to N)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-primes/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Boolean array of size N+1. Cross out multiples from i*i up to N in O(N log log N)."
          },
          {
            "id": "s8_17",
            "title": "Find Prime Factorisation using Sieve (SPF)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-primes/",
            "companies": [
              "Google"
            ],
            "hint": "Smallest Prime Factor (SPF) array: repeatedly divide N by SPF[N] in O(log N)."
          },
          {
            "id": "s8_18",
            "title": "Power Set using Bit Manipulation",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subsets/",
            "companies": [
              "Amazon"
            ],
            "hint": "Loop mask from 0 to (1 << N) - 1: if (mask & (1 << j)) include arr[j]."
          },
          {
            "id": "s8_19",
            "title": "Divide Two Integers without using Multiplication, Division or Mod",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/divide-two-integers/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Exponential subtract: shift divisor left by 31 down to 0 while dividend >= (divisor << i)."
          }
        ]
      }
    ]
  },
  {
    "step": 9,
    "title": "Step 9: Stack and Queues [Learning, Monotonic, Implementation]",
    "description": "Monotonic stacks, parenthesis matching, sliding windows, and caching queues.",
    "topics": [
      {
        "name": "Lec 1: Learning",
        "problems": [
          {
            "id": "s9_1",
            "title": "Implement Stack using Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/baseball-game/",
            "companies": [
              "Infosys"
            ],
            "hint": "Top index pointer, bounds checking on push/pop."
          },
          {
            "id": "s9_2",
            "title": "Implement Queue using Array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-circular-queue/",
            "companies": [
              "TCS"
            ],
            "hint": "Circular array with front, rear, and count variables."
          },
          {
            "id": "s9_3",
            "title": "Implement Stack using Queue",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/implement-stack-using-queues/",
            "companies": [
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Push to queue, rotate queue size-1 times to bring new element to front."
          },
          {
            "id": "s9_4",
            "title": "Implement Queue using Stack",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/implement-queue-using-stacks/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Two stacks: input and output. Push to input; pop from output, refill if empty."
          },
          {
            "id": "s9_5",
            "title": "Implement Stack using LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/baseball-game/",
            "companies": [
              "Wipro"
            ],
            "hint": "Push at head, pop at head."
          },
          {
            "id": "s9_6",
            "title": "Implement Queue using LinkedList",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/design-circular-queue/",
            "companies": [
              "Accenture"
            ],
            "hint": "Maintain head (dequeue) and tail (enqueue)."
          },
          {
            "id": "s9_7",
            "title": "Check for Balanced Parentheses",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/valid-parentheses/",
            "companies": [
              "Amazon",
              "Google",
              "Facebook"
            ],
            "hint": "Push opening bracket. On closing bracket, check top match."
          }
        ]
      },
      {
        "name": "Lec 2: Prefix, Infix, Postfix Conversion",
        "problems": [
          {
            "id": "s9_8",
            "title": "Infix to Postfix Conversion using Stack",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/basic-calculator-ii/",
            "companies": [
              "Amazon"
            ],
            "hint": "Operator precedence table, pop operators >= current priority."
          },
          {
            "id": "s9_9",
            "title": "Prefix to Infix Conversion",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/basic-calculator/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Traverse from right to left, stack holds operands: '(' + op1 + op + op2 + ')'."
          },
          {
            "id": "s9_10",
            "title": "Prefix to Postfix Conversion",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
            "companies": [
              "Amazon"
            ],
            "hint": "Traverse right to left: op1 + op2 + op."
          },
          {
            "id": "s9_11",
            "title": "Postfix to Prefix Conversion",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
            "companies": [
              "Google"
            ],
            "hint": "Traverse left to right: op + op1 + op2."
          },
          {
            "id": "s9_12",
            "title": "Postfix to Infix Conversion",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/basic-calculator-ii/",
            "companies": [
              "Amazon"
            ],
            "hint": "Traverse left to right: '(' + op1 + op + op2 + ')'."
          },
          {
            "id": "s9_13",
            "title": "Evaluate Reverse Polish Notation (Postfix)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
            "companies": [
              "Amazon",
              "LinkedIn"
            ],
            "hint": "Stack holds numbers; pop two operands on operator, compute and push result."
          },
          {
            "id": "s9_14",
            "title": "Basic Calculator I & II",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/basic-calculator/",
            "companies": [
              "Google",
              "Facebook"
            ],
            "hint": "Stack for signs and parenthesis levels; track running result and current operand."
          }
        ]
      },
      {
        "name": "Lec 3: Monotonic Stack / Queue Problems",
        "problems": [
          {
            "id": "s9_15",
            "title": "Next Greater Element I",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/next-greater-element-i/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Monotonic decreasing stack from right to left."
          },
          {
            "id": "s9_16",
            "title": "Next Greater Element II (Circular Array)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/next-greater-element-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Loop 2*N-1 down to 0, use index i % N with monotonic stack."
          },
          {
            "id": "s9_17",
            "title": "Next Smaller Element (Immediate Smaller)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/",
            "companies": [
              "Amazon"
            ],
            "hint": "Monotonic increasing stack from right to left."
          },
          {
            "id": "s9_18",
            "title": "Number of NGEs to the right",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Merge sort count technique or Fenwick tree."
          },
          {
            "id": "s9_19",
            "title": "Trapping Rainwater",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/trapping-rain-water/",
            "companies": [
              "Amazon",
              "Google",
              "Goldman Sachs"
            ],
            "hint": "Two pointers left and right tracking left_max and right_max in O(N) and O(1) space."
          },
          {
            "id": "s9_20",
            "title": "Sum of Subarray Minimums",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sum-of-subarray-minimums/",
            "companies": [
              "Amazon"
            ],
            "hint": "Find Previous Less Element (PLE) and Next Less Element (NLE) with monotonic stack."
          },
          {
            "id": "s9_21",
            "title": "Sum of Subarray Ranges",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sum-of-subarray-ranges/",
            "companies": [
              "Amazon"
            ],
            "hint": "Sum of subarray maximums - Sum of subarray minimums."
          },
          {
            "id": "s9_22",
            "title": "Asteroid Collision",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/asteroid-collision/",
            "companies": [
              "Amazon",
              "Uber"
            ],
            "hint": "Stack holds surviving asteroids; resolve collision when top > 0 and incoming < 0."
          },
          {
            "id": "s9_23",
            "title": "Largest Rectangle in Histogram",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Monotonic increasing stack: find previous smaller and next smaller bars."
          },
          {
            "id": "s9_24",
            "title": "Maximal Rectangle in Binary Matrix",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/maximal-rectangle/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Cumulative heights row by row, invoke Largest Rectangle in Histogram on each row."
          },
          {
            "id": "s9_25",
            "title": "Remove K Digits to make Smallest Number",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/remove-k-digits/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Monotonic increasing stack: pop while top > current and k > 0."
          }
        ]
      },
      {
        "name": "Lec 4: Implementation Problems",
        "problems": [
          {
            "id": "s9_26",
            "title": "Sliding Window Maximum",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/sliding-window-maximum/",
            "companies": [
              "Amazon",
              "Google",
              "Microsoft"
            ],
            "hint": "Monotonic decreasing deque storing indices: front is always window max."
          },
          {
            "id": "s9_27",
            "title": "Implement Min Stack",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/min-stack/",
            "companies": [
              "Amazon",
              "Bloomberg"
            ],
            "hint": "Store pairs (val, current_min) or encode delta: 2*val - min."
          },
          {
            "id": "s9_28",
            "title": "The Celebrity Problem",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-the-celebrity/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Google"
            ],
            "hint": "Two pointers or stack: if A knows B, A is not celeb, B could be. Verify candidate."
          },
          {
            "id": "s9_29",
            "title": "Rotten Oranges (BFS with Queue)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/rotting-oranges/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Multi-source BFS: push all initially rotten oranges to queue, step minutes."
          },
          {
            "id": "s9_30",
            "title": "Online Stock Span",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/online-stock-span/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Monotonic decreasing stack storing (price, span); combine spans while top <= price."
          }
        ]
      }
    ]
  },
  {
    "step": 10,
    "title": "Step 10: Sliding Window & Two Pointer Combined",
    "description": "Continuous subarray optimization, frequency windows, and maximum bounds.",
    "topics": [
      {
        "name": "Medium Sliding Window",
        "problems": [
          {
            "id": "s10_1",
            "title": "Longest Substring Without Repeating Characters",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Facebook"
            ],
            "hint": "Hash map storing last seen index of each character: left = max(left, map[c] + 1)."
          },
          {
            "id": "s10_2",
            "title": "Max Consecutive Ones III (At most K zeroes flipped)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Sliding window tracking zeroes count <= k. Expand right, shrink left if zeroes > k."
          },
          {
            "id": "s10_3",
            "title": "Fruit Into Baskets (At most 2 distinct types)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/fruit-into-baskets/",
            "companies": [
              "Google"
            ],
            "hint": "Sliding window keeping hash map of at most 2 distinct keys."
          },
          {
            "id": "s10_4",
            "title": "Longest Repeating Character Replacement",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Window size - max_frequency <= k. Expand right, slide window."
          },
          {
            "id": "s10_5",
            "title": "Binary Subarrays With Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-subarrays-with-sum/",
            "companies": [
              "Amazon"
            ],
            "hint": "atMost(goal) - atMost(goal - 1) using two pointers."
          },
          {
            "id": "s10_6",
            "title": "Count Number of Nice Subarrays",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
            "companies": [
              "Amazon"
            ],
            "hint": "Replace odds with 1, evens with 0 -> identical to Binary Subarrays With Sum."
          },
          {
            "id": "s10_7",
            "title": "Number of Substrings Containing All Three Characters",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
            "companies": [
              "Google"
            ],
            "hint": "Track last seen positions of 'a', 'b', 'c': add 1 + min(lastA, lastB, lastC)."
          },
          {
            "id": "s10_8",
            "title": "Maximum Points You Can Obtain from Cards",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
            "companies": [
              "Google"
            ],
            "hint": "Sum of first k cards; slide window removing from left, adding from right."
          }
        ]
      },
      {
        "name": "Hard Sliding Window",
        "problems": [
          {
            "id": "s10_9",
            "title": "Longest Substring with At Most K Distinct Characters",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Sliding window with frequency map; shrink left when map.size() > k."
          },
          {
            "id": "s10_10",
            "title": "Subarrays with K Different Integers",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
            "companies": [
              "Amazon"
            ],
            "hint": "exactly(K) = atMost(K) - atMost(K - 1)."
          },
          {
            "id": "s10_11",
            "title": "Minimum Window Substring",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/minimum-window-substring/",
            "companies": [
              "Google",
              "Facebook",
              "Microsoft"
            ],
            "hint": "Two pointers with char count match condition: expand right to satisfy, contract left to minimize."
          },
          {
            "id": "s10_12",
            "title": "Minimum Window Subsequence",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/minimum-window-substring/",
            "companies": [
              "Google"
            ],
            "hint": "Match pattern forward, backtrack backward to find optimal start point."
          }
        ]
      }
    ]
  },
  {
    "step": 11,
    "title": "Step 11: Heaps / Priority Queues [Learning, Medium, Hard]",
    "description": "Complete binary trees, heapify, min/max priority queues, and streaming medians.",
    "topics": [
      {
        "name": "Lec 1: Learning Heap",
        "problems": [
          {
            "id": "s11_1",
            "title": "Introduction to Priority Queues using Binary Heaps",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Heap order property: parent <= children (Min-Heap) or parent >= children (Max-Heap)."
          },
          {
            "id": "s11_2",
            "title": "Min Heap and Max Heap Implementation",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Google"
            ],
            "hint": "Left child = 2*i + 1, right child = 2*i + 2, parent = (i - 1)/2."
          },
          {
            "id": "s11_3",
            "title": "Check if an Array represents a Binary Heap",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Microsoft"
            ],
            "hint": "For every node i from 0 up to (N-2)/2, check arr[i] >= left and arr[i] >= right."
          },
          {
            "id": "s11_4",
            "title": "Convert Min Heap to Max Heap in O(N)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Run maxHeapify on all internal nodes from (N/2 - 1) down to 0 in O(N)."
          }
        ]
      },
      {
        "name": "Lec 2: Medium Problems",
        "problems": [
          {
            "id": "s11_5",
            "title": "Kth Largest Element in an Array",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Amazon",
              "Google",
              "Facebook"
            ],
            "hint": "Min-Heap of size K: top will hold the Kth largest element."
          },
          {
            "id": "s11_6",
            "title": "Kth Smallest Element in an Array",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Max-Heap of size K: top holds the Kth smallest element."
          },
          {
            "id": "s11_7",
            "title": "Sort K-Sorted (Nearly Sorted) Array",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/sort-an-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Min-heap of size K+1: pop minimum and push next element in O(N log K)."
          },
          {
            "id": "s11_8",
            "title": "Replace elements by their rank in array",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/rank-transform-of-an-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Sort unique elements, map value to rank 1..N."
          },
          {
            "id": "s11_9",
            "title": "Task Scheduler",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/task-scheduler/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Idle slots = (max_freq - 1) * n. Fill remaining tasks greedily into idle slots."
          },
          {
            "id": "s11_10",
            "title": "Hands of Straights (Divide into groups of size W)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/hand-of-straights/",
            "companies": [
              "Google"
            ],
            "hint": "Min-heap / TreeMap of frequencies: greedily start group from smallest key."
          },
          {
            "id": "s11_11",
            "title": "Design Twitter",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/design-twitter/",
            "companies": [
              "Twitter",
              "Amazon"
            ],
            "hint": "Follower map, tweet linked lists per user, K-way merge using max-heap."
          }
        ]
      },
      {
        "name": "Lec 3: Hard Problems",
        "problems": [
          {
            "id": "s11_12",
            "title": "Connect N Ropes with Minimum Cost",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
            "companies": [
              "Amazon",
              "Goldman Sachs"
            ],
            "hint": "Min-heap: repeatedly extract two smallest ropes, add their sum to cost, push sum."
          },
          {
            "id": "s11_13",
            "title": "Kth Largest Element in a Stream",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
            "companies": [
              "Amazon"
            ],
            "hint": "Min-heap of size K: add element, if size > k pop minimum; return top."
          },
          {
            "id": "s11_14",
            "title": "Find Median from Data Stream",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/find-median-from-data-stream/",
            "companies": [
              "Google",
              "Amazon",
              "Microsoft",
              "Apple"
            ],
            "hint": "Two heaps: max-heap (left half) and min-heap (right half). Balance sizes within 1."
          },
          {
            "id": "s11_15",
            "title": "Top K Frequent Elements",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/top-k-frequent-elements/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Min-heap of size K based on frequency, or Bucket Sort in O(N)."
          },
          {
            "id": "s11_16",
            "title": "Merge K Sorted Arrays",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/merge-k-sorted-lists/",
            "companies": [
              "Amazon"
            ],
            "hint": "Min-heap storing (val, array_idx, element_idx)."
          },
          {
            "id": "s11_17",
            "title": "Smallest Range Covering Elements from K Lists",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Min-heap of size K tracking current min, variable tracking current max."
          }
        ]
      }
    ]
  },
  {
    "step": 12,
    "title": "Step 12: Greedy Algorithms [Easy, Medium, Hard]",
    "description": "Optimal choice at each stage, interval scheduling, and fractional allocations.",
    "topics": [
      {
        "name": "Lec 1: Easy Greedy Problems",
        "problems": [
          {
            "id": "s12_1",
            "title": "Assign Cookies",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/assign-cookies/",
            "companies": [
              "Amazon"
            ],
            "hint": "Sort children greed and cookie sizes: satisfy smallest greed with smallest cookie."
          },
          {
            "id": "s12_2",
            "title": "Fractional Knapsack Problem",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-units-on-a-truck/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Sort items descending by value/weight ratio. Greedily take whole, then fraction."
          },
          {
            "id": "s12_3",
            "title": "Find Minimum Number of Coins (Greedy Coin Change)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/coin-change/",
            "companies": [
              "TCS"
            ],
            "hint": "Canonical Indian currency system allows greedy pick from highest denomination."
          },
          {
            "id": "s12_4",
            "title": "Lemonade Change",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/lemonade-change/",
            "companies": [
              "Amazon"
            ],
            "hint": "Greedily return 10+5 bill for $20 if available, otherwise three $5 bills."
          },
          {
            "id": "s12_5",
            "title": "Valid Parenthesis String with Wildcard '*'",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/valid-parenthesis-string/",
            "companies": [
              "Facebook"
            ],
            "hint": "Track range [min_open, max_open]; '*' can decrement, leave unchanged, or increment."
          }
        ]
      },
      {
        "name": "Lec 2: Medium/Hard Greedy Problems",
        "problems": [
          {
            "id": "s12_6",
            "title": "N Meetings in One Room",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/non-overlapping-intervals/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Sort meetings by end time. Pick meeting if start_time > prev_meeting_end_time."
          },
          {
            "id": "s12_7",
            "title": "Minimum Platforms Required for Railway Station",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/meeting-rooms-ii/",
            "companies": [
              "Amazon",
              "Morgan Stanley"
            ],
            "hint": "Sort arrival and departure arrays separately. Two pointers tracking simultaneous trains."
          },
          {
            "id": "s12_8",
            "title": "Job Sequencing Problem (Max Profit)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-profit-in-job-scheduling/",
            "companies": [
              "Amazon"
            ],
            "hint": "Sort descending by profit. Schedule job at latest available slot <= deadline."
          },
          {
            "id": "s12_9",
            "title": "Candy Distribution",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/candy/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Two passes: left to right (if ratings[i] > ratings[i-1], c[i] = c[i-1] + 1), then right to left."
          },
          {
            "id": "s12_10",
            "title": "Non-overlapping Intervals",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/non-overlapping-intervals/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "Sort by end time. Count compatible intervals; answer = total - compatible."
          },
          {
            "id": "s12_11",
            "title": "Insert Interval",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/insert-interval/",
            "companies": [
              "Google",
              "Facebook"
            ],
            "hint": "Add all before newInterval, merge overlapping intervals, add remaining."
          },
          {
            "id": "s12_12",
            "title": "Merge Intervals",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/merge-intervals/",
            "companies": [
              "Google",
              "Microsoft"
            ],
            "hint": "Sort by start time. Merge if curr.start <= prev.end."
          },
          {
            "id": "s12_13",
            "title": "Jump Game I",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/jump-game/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "Maintain max_reachable index: if i > max_reachable return false."
          },
          {
            "id": "s12_14",
            "title": "Jump Game II (Minimum Jumps)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/jump-game-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "BFS level boundaries: current_end and farthest. When i reaches current_end, jump++."
          },
          {
            "id": "s12_15",
            "title": "Gas Station (Circular Tour)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/gas-station/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Google"
            ],
            "hint": "If total_gas >= total_cost, a solution exists. Reset start = i + 1 when current_tank < 0."
          }
        ]
      }
    ]
  },
  {
    "step": 13,
    "title": "Step 13: Binary Trees [Traversals, Medium, Hard]",
    "description": "Tree traversals, structural views, lowest common ancestors, and serialized paths.",
    "topics": [
      {
        "name": "Lec 1: Traversals",
        "problems": [
          {
            "id": "s13_1",
            "title": "Introduction to Trees & Binary Tree Representation",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "companies": [
              "Infosys"
            ],
            "hint": "Binary Tree node structure with val, left, right pointers."
          },
          {
            "id": "s13_2",
            "title": "Binary Tree Preorder Traversal (Recursive)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Root -> Left -> Right."
          },
          {
            "id": "s13_3",
            "title": "Binary Tree Inorder Traversal (Recursive)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "companies": [
              "Amazon"
            ],
            "hint": "Left -> Root -> Right."
          },
          {
            "id": "s13_4",
            "title": "Binary Tree Postorder Traversal (Recursive)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            "companies": [
              "Google"
            ],
            "hint": "Left -> Right -> Root."
          },
          {
            "id": "s13_5",
            "title": "Level Order Traversal / BFS",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Queue BFS: isolate levels with queue size loop."
          },
          {
            "id": "s13_6",
            "title": "Iterative Preorder Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            "companies": [
              "Amazon"
            ],
            "hint": "Stack: push root, pop top, push right child, then push left child."
          },
          {
            "id": "s13_7",
            "title": "Iterative Inorder Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Pointer node: push while node != null, else pop, print, node = popped.right."
          },
          {
            "id": "s13_8",
            "title": "Iterative Postorder Traversal using 2 Stacks",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            "companies": [
              "Google"
            ],
            "hint": "Stack 1 pops to stack 2, pushes left then right. Stack 2 pops in postorder."
          },
          {
            "id": "s13_9",
            "title": "Iterative Postorder Traversal using 1 Stack",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            "companies": [
              "Amazon"
            ],
            "hint": "Traverse left, check right; if right null or already visited, process root."
          },
          {
            "id": "s13_10",
            "title": "Preorder, Inorder, and Postorder in One Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "companies": [
              "Amazon"
            ],
            "hint": "Stack with pairs (node, state 1/2/3): 1=pre, 2=in, 3=post."
          },
          {
            "id": "s13_11",
            "title": "Morris Inorder Traversal in O(1) Space",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Threaded Binary Tree: link rightmost node of left subtree to current node."
          },
          {
            "id": "s13_12",
            "title": "Morris Preorder Traversal in O(1) Space",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            "companies": [
              "Google"
            ],
            "hint": "Print when creating thread, remove thread on second visit."
          },
          {
            "id": "s13_13",
            "title": "Check if Two Trees are Identical",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/same-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "p.val == q.val && isSame(p.left, q.left) && isSame(p.right, q.right)."
          }
        ]
      },
      {
        "name": "Lec 2: Medium Problems",
        "problems": [
          {
            "id": "s13_14",
            "title": "Maximum Depth of Binary Tree",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            "companies": [
              "Amazon",
              "LinkedIn"
            ],
            "hint": "1 + max(depth(left), depth(right))."
          },
          {
            "id": "s13_15",
            "title": "Check for Balanced Binary Tree",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/balanced-binary-tree/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Return height if balanced; return -1 if abs(lh - rh) > 1."
          },
          {
            "id": "s13_16",
            "title": "Diameter of Binary Tree",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/diameter-of-binary-tree/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "max_d = max(max_d, lh + rh) at each node."
          },
          {
            "id": "s13_17",
            "title": "Binary Tree Maximum Path Sum",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Max gain = node.val + max(0, left) + max(0, right). Update global max."
          },
          {
            "id": "s13_18",
            "title": "Zig-Zag or Spiral Level Order Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Level order BFS: flip direction flag each level, insert into array by index."
          },
          {
            "id": "s13_19",
            "title": "Boundary Traversal of Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/boundary-of-binary-tree/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Left boundary without leaves + all leaves (inorder) + right boundary reversed."
          },
          {
            "id": "s13_20",
            "title": "Vertical Order Traversal of Binary Tree",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "BFS tracking (x: vertical, y: level); sort by (x, y, value)."
          },
          {
            "id": "s13_21",
            "title": "Top View of Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            "companies": [
              "Amazon",
              "TCS"
            ],
            "hint": "BFS tracking line vertical coordinate x; store first node seen at each x."
          },
          {
            "id": "s13_22",
            "title": "Bottom View of Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            "companies": [
              "Amazon",
              "Paytm"
            ],
            "hint": "BFS tracking line x; overwrite node for coordinate x so last seen remains."
          },
          {
            "id": "s13_23",
            "title": "Right / Left View of Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-right-side-view/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "Reverse preorder (Root -> Right -> Left): add node if level == result.size()."
          },
          {
            "id": "s13_24",
            "title": "Symmetric Binary Tree (Mirror Reflection)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/symmetric-tree/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)."
          },
          {
            "id": "s13_25",
            "title": "Root to Node Path in Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-tree-paths/",
            "companies": [
              "Amazon"
            ],
            "hint": "Backtracking path array: push node; return true if target; pop on return."
          }
        ]
      },
      {
        "name": "Lec 3: Hard Problems",
        "problems": [
          {
            "id": "s13_26",
            "title": "Lowest Common Ancestor of a Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            "companies": [
              "Amazon",
              "Microsoft",
              "Facebook"
            ],
            "hint": "If root matches p or q, return root. If left and right both non-null, root is LCA."
          },
          {
            "id": "s13_27",
            "title": "Maximum Width of Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Assign index: left = 2*i + 1, right = 2*i + 2. Normalize by level min index."
          },
          {
            "id": "s13_28",
            "title": "Children Sum Property in Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/root-equals-sum-of-children/",
            "companies": [
              "Amazon"
            ],
            "hint": "Reassign child values before recursion, sum up on return to ensure root = left + right."
          },
          {
            "id": "s13_29",
            "title": "All Nodes Distance K in Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "Map parent pointers using BFS, then run radial BFS of radius K from target."
          },
          {
            "id": "s13_30",
            "title": "Minimum Time taken to BURN the Binary Tree from a Node",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/",
            "companies": [
              "Amazon"
            ],
            "hint": "BFS with parent pointers: burn left, right, and parent simultaneously."
          },
          {
            "id": "s13_31",
            "title": "Count Total Nodes in a Complete Binary Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-complete-tree-nodes/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "If left height == right height: 2^h - 1 nodes; otherwise 1 + count(left) + count(right) in O(log^2 N)."
          },
          {
            "id": "s13_32",
            "title": "Requirements to construct a Unique Binary Tree",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            "companies": [
              "Microsoft"
            ],
            "hint": "Inorder is mandatory along with either Preorder or Postorder."
          },
          {
            "id": "s13_33",
            "title": "Construct Binary Tree from Preorder and Inorder Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Preorder gives root; Inorder hash map splits left and right subtrees."
          },
          {
            "id": "s13_34",
            "title": "Construct Binary Tree from Postorder and Inorder Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Postorder end gives root; split inorder."
          },
          {
            "id": "s13_35",
            "title": "Serialize and Deserialize Binary Tree",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            "companies": [
              "Amazon",
              "Google",
              "Facebook"
            ],
            "hint": "Level-order string format separated by commas with '#' for nulls."
          },
          {
            "id": "s13_36",
            "title": "Flatten Binary Tree to LinkedList (In-place)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Reverse postorder traversal (Right -> Left -> Root): curr.right = prev, curr.left = null."
          },
          {
            "id": "s13_37",
            "title": "Invert / Flip Binary Tree",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/invert-binary-tree/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Swap left and right children recursively."
          }
        ]
      }
    ]
  },
  {
    "step": 14,
    "title": "Step 14: Binary Search Trees [Concepts & Practice]",
    "description": "BST properties, in-order ordering, validation, and balanced construction.",
    "topics": [
      {
        "name": "Lec 1: Concepts of BST",
        "problems": [
          {
            "id": "s14_1",
            "title": "Introduction to Binary Search Trees",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "Left subtree < node < right subtree; in-order traversal is sorted."
          },
          {
            "id": "s14_2",
            "title": "Search in a Binary Search Tree",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "If val < root.val go left, else go right."
          },
          {
            "id": "s14_3",
            "title": "Find Min/Max element in BST",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "companies": [
              "TCS"
            ],
            "hint": "Min is leftmost node; Max is rightmost node."
          }
        ]
      },
      {
        "name": "Lec 2: Practice Problems",
        "problems": [
          {
            "id": "s14_4",
            "title": "Ceil in a Binary Search Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "If key <= root.val: ceil = root.val, go left; else go right."
          },
          {
            "id": "s14_5",
            "title": "Floor in a Binary Search Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "If key >= root.val: floor = root.val, go right; else go left."
          },
          {
            "id": "s14_6",
            "title": "Insert a given Node in BST",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "Navigate down until null leaf position, attach new TreeNode."
          },
          {
            "id": "s14_7",
            "title": "Delete a Node in BST",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/delete-node-in-a-bst/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "0 children: remove; 1 child: link; 2 children: replace with in-order successor."
          },
          {
            "id": "s14_8",
            "title": "Find Kth Smallest / Largest element in BST",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "In-order traversal visits nodes in ascending order; Kth visited is answer."
          },
          {
            "id": "s14_9",
            "title": "Validate Binary Search Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/validate-binary-search-tree/",
            "companies": [
              "Amazon",
              "Google",
              "JP Morgan"
            ],
            "hint": "Pass bounds (min_val, max_val). Every node must strictly satisfy range."
          },
          {
            "id": "s14_10",
            "title": "Lowest Common Ancestor of a BST",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "If both p and q > root go right; if both < root go left; otherwise split point is LCA."
          },
          {
            "id": "s14_11",
            "title": "Construct BST from Preorder Traversal",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
            "companies": [
              "Amazon"
            ],
            "hint": "Pass upper bound constraint; advance index if preorder[i] < bound in O(N)."
          },
          {
            "id": "s14_12",
            "title": "Inorder Successor / Predecessor in BST",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/inorder-successor-in-bst/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Successor: smallest node > key; Predecessor: largest node < key."
          },
          {
            "id": "s14_13",
            "title": "BST Iterator",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/binary-search-tree-iterator/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Stack pushing left chain: next() pops top and pushes right child's left chain in O(1) amortized."
          },
          {
            "id": "s14_14",
            "title": "Two Sum IV - Input is a BST",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
            "companies": [
              "Amazon",
              "Facebook"
            ],
            "hint": "Two BST Iterators (one normal forward, one reverse): two pointers converging on sum."
          },
          {
            "id": "s14_15",
            "title": "Recover BST (Two nodes swapped)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/recover-binary-search-tree/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Inorder traversal: find first anomaly (prev > curr) and second anomaly; swap values."
          },
          {
            "id": "s14_16",
            "title": "Largest BST in Binary Tree",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Postorder returning (isBST, size, min_val, max_val)."
          }
        ]
      }
    ]
  },
  {
    "step": 15,
    "title": "Step 15: Graphs [BFS/DFS, Topo Sort, Shortest Path, MST]",
    "description": "Graph traversals, topological sorting, Dijkstra, Bellman-Ford, and Disjoint Sets.",
    "topics": [
      {
        "name": "Lec 1: Learning",
        "problems": [
          {
            "id": "s15_1",
            "title": "Introduction to Graphs: Types & Representations",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/find-the-town-judge/",
            "companies": [
              "Infosys"
            ],
            "hint": "Adjacency Matrix vs Adjacency List (Vector of Vectors)."
          },
          {
            "id": "s15_2",
            "title": "Connected Components in Graph",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/number-of-provinces/",
            "companies": [
              "Amazon"
            ],
            "hint": "Loop 1..V: if !visited[i], start new component BFS/DFS."
          },
          {
            "id": "s15_3",
            "title": "BFS Traversal of Graph",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/clone-graph/",
            "companies": [
              "Amazon"
            ],
            "hint": "Queue BFS marking visited on push to prevent duplicate queueing."
          },
          {
            "id": "s15_4",
            "title": "DFS Traversal of Graph",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/all-paths-from-source-to-target/",
            "companies": [
              "Amazon"
            ],
            "hint": "Recursive traversal marking visited on function entry."
          }
        ]
      },
      {
        "name": "Lec 2: Problems on BFS / DFS",
        "problems": [
          {
            "id": "s15_5",
            "title": "Number of Provinces",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-provinces/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Count components using BFS/DFS on adjacency matrix."
          },
          {
            "id": "s15_6",
            "title": "Number of Islands (Grid Connected Components)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-islands/",
            "companies": [
              "Amazon",
              "Google",
              "Microsoft",
              "JP Morgan"
            ],
            "hint": "Iterate grid. On '1', trigger BFS/DFS to sink connected land cells to '0'."
          },
          {
            "id": "s15_7",
            "title": "Flood Fill Algorithm",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/flood-fill/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "DFS changing cells with initialColor to newColor."
          },
          {
            "id": "s15_8",
            "title": "Rotten Oranges",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/rotting-oranges/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Multi-source BFS using queue initialized with all initially rotten oranges."
          },
          {
            "id": "s15_9",
            "title": "Detect Cycle in an Undirected Graph (using BFS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/redundant-connection/",
            "companies": [
              "Amazon"
            ],
            "hint": "Queue stores (node, parent): if neighbor visited and not parent, cycle exists."
          },
          {
            "id": "s15_10",
            "title": "Detect Cycle in an Undirected Graph (using DFS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/redundant-connection/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "DFS passing parent: if neighbor visited and neighbor != parent, cycle."
          },
          {
            "id": "s15_11",
            "title": "0/1 Matrix (Distance of Nearest 0 for each cell)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/01-matrix/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Multi-source BFS from all 0s simultaneously."
          },
          {
            "id": "s15_12",
            "title": "Surrounded Regions (Replace O's with X's)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/surrounded-regions/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Boundary DFS: mark all 'O' connected to borders; remaining 'O' are captured."
          },
          {
            "id": "s15_13",
            "title": "Number of Enclaves",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-enclaves/",
            "companies": [
              "Google"
            ],
            "hint": "Boundary BFS/DFS sinks walkable cells touching edges; count remaining 1s."
          },
          {
            "id": "s15_14",
            "title": "Word Ladder I (Shortest transformation sequence)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/word-ladder/",
            "companies": [
              "Amazon",
              "Google",
              "Facebook"
            ],
            "hint": "BFS: mutate each character 'a'..'z'; look up in word set, erase when visited."
          },
          {
            "id": "s15_15",
            "title": "Word Ladder II",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/word-ladder-ii/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "BFS for level map from beginWord, followed by DFS backtracking from endWord to beginWord."
          },
          {
            "id": "s15_16",
            "title": "Number of Distinct Islands",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-distinct-islands/",
            "companies": [
              "Amazon"
            ],
            "hint": "Record relative coordinates (r - r0, c - c0) in set during DFS."
          },
          {
            "id": "s15_17",
            "title": "Bipartite Graph (Check using BFS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/is-graph-bipartite/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "2-color BFS: color neighbor with 1 - color[curr]; cycle with same color fails."
          },
          {
            "id": "s15_18",
            "title": "Bipartite Graph (Check using DFS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/is-graph-bipartite/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "DFS coloring: if uncolored, recurse with opposite color; if colored same, return false."
          },
          {
            "id": "s15_19",
            "title": "Detect Cycle in Directed Graph (DFS with pathVisited)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/course-schedule/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Two boolean arrays: visited and pathVisited (backtrack pathVisited on return)."
          }
        ]
      },
      {
        "name": "Lec 3: Topo Sort and Problems",
        "problems": [
          {
            "id": "s15_20",
            "title": "Topological Sort (DFS using Stack)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/course-schedule-ii/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "DFS: after visiting all outgoing neighbors, push current node to stack."
          },
          {
            "id": "s15_21",
            "title": "Kahn's Algorithm (Topological Sort using BFS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/course-schedule-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Compute in-degrees: push in-degree 0 nodes to queue; decrement neighbors on pop."
          },
          {
            "id": "s15_22",
            "title": "Detect Cycle in Directed Graph (Kahn's BFS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/course-schedule/",
            "companies": [
              "Amazon"
            ],
            "hint": "If topo sort count < V, graph contains a cycle."
          },
          {
            "id": "s15_23",
            "title": "Course Schedule I (Prerequisites cycle check)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/course-schedule/",
            "companies": [
              "Amazon",
              "Google",
              "Morgan Stanley"
            ],
            "hint": "Topological sort: compute in-degrees, push 0 to queue. Cycle if processed count != N."
          },
          {
            "id": "s15_24",
            "title": "Course Schedule II (Return course ordering)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/course-schedule-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Return array of topological sort if count == numCourses, else empty array."
          },
          {
            "id": "s15_25",
            "title": "Find Eventual Safe States",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-eventual-safe-states/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Reverse edges and run Kahn's algorithm from terminal nodes."
          },
          {
            "id": "s15_26",
            "title": "Alien Dictionary",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/alien-dictionary/",
            "companies": [
              "Google",
              "Facebook",
              "Amazon"
            ],
            "hint": "Compare adjacent words to find directed edges u -> v; topological sort on DAG."
          }
        ]
      },
      {
        "name": "Lec 4: Shortest Path Algorithms and Problems",
        "problems": [
          {
            "id": "s15_27",
            "title": "Shortest Path in Undirected Graph with Unit Weights",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            "companies": [
              "Amazon"
            ],
            "hint": "Standard BFS with dist array initialized to infinity."
          },
          {
            "id": "s15_28",
            "title": "Shortest Path in Directed Acyclic Graph (DAG)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
            "companies": [
              "Amazon"
            ],
            "hint": "Topological sort first, then relax edges in topo order in O(V + E)."
          },
          {
            "id": "s15_29",
            "title": "Dijkstra's Algorithm using Priority Queue",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
            "companies": [
              "Google",
              "Amazon",
              "Uber"
            ],
            "hint": "Min-heap priority queue storing (distance, node). Greedily relax outgoing edges."
          },
          {
            "id": "s15_30",
            "title": "Dijkstra's Algorithm using Set",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
            "companies": [
              "Google"
            ],
            "hint": "Set allows erasing outdated longer distance pairs, saving redundant pops."
          },
          {
            "id": "s15_31",
            "title": "Print Shortest Path in Weighted Graph",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
            "companies": [
              "Amazon"
            ],
            "hint": "Maintain parent array during Dijkstra relaxation; trace back from destination to source."
          },
          {
            "id": "s15_32",
            "title": "Shortest Path in Binary Matrix",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "8-directional BFS in binary grid from (0,0) to (N-1,N-1)."
          },
          {
            "id": "s15_33",
            "title": "Path with Minimum Effort",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/path-with-minimum-effort/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Dijkstra on grid: distance is max(effort, abs(height[r][c] - height[nr][nc]))."
          },
          {
            "id": "s15_34",
            "title": "Cheapest Flights Within K Stops",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Queue BFS prioritized by stops (0..k) rather than distance."
          },
          {
            "id": "s15_35",
            "title": "Network Delay Time",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Dijkstra from source K: max distance across all nodes (or -1 if unreachable)."
          },
          {
            "id": "s15_36",
            "title": "Number of Ways to Arrive at Destination",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
            "companies": [
              "Amazon"
            ],
            "hint": "Dijkstra with ways array: if equal distance found, ways[v] = (ways[v] + ways[u]) % MOD."
          },
          {
            "id": "s15_37",
            "title": "Minimum Multiplications to Reach End",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/minimum-genetic-mutation/",
            "companies": [
              "Amazon"
            ],
            "hint": "BFS over state space 0..99999 with modulo 100000."
          },
          {
            "id": "s15_38",
            "title": "Bellman-Ford Algorithm (Handles Negative Weights)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
            "companies": [
              "Amazon"
            ],
            "hint": "Relax all edges V-1 times. 1 extra pass detects negative weight cycles."
          },
          {
            "id": "s15_39",
            "title": "Floyd-Warshall Algorithm (All-Pairs Shortest Path)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
            "companies": [
              "Amazon"
            ],
            "hint": "3 nested loops: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])."
          },
          {
            "id": "s15_40",
            "title": "Find the City with Smallest Number of Neighbors at Threshold",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
            "companies": [
              "Amazon"
            ],
            "hint": "Run Floyd-Warshall; count reachable cities with dist <= threshold for each city."
          }
        ]
      },
      {
        "name": "Lec 5: Minimum Spanning Tree / Disjoint Set",
        "problems": [
          {
            "id": "s15_41",
            "title": "Prim's Algorithm for Minimum Spanning Tree",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Min-heap storing (weight, node, parent): greedily add cheapest edge connecting visited to unvisited."
          },
          {
            "id": "s15_42",
            "title": "Disjoint Set Union (DSU) by Rank and Size",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/redundant-connection/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Find parent with path compression and Union by rank/size in O(alpha(N))."
          },
          {
            "id": "s15_43",
            "title": "Kruskal's Algorithm for MST",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Sort all edges by weight ascending. Add edge if findParent(u) != findParent(v)."
          },
          {
            "id": "s15_44",
            "title": "Number of Operations to Make Network Connected",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
            "companies": [
              "Amazon"
            ],
            "hint": "Extra edges = edges - (V-1); components - 1 operations required."
          },
          {
            "id": "s15_45",
            "title": "Most Stones Removed with Same Row or Column",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Union row index r with column index (c + 10001). Answer = stones - components."
          },
          {
            "id": "s15_46",
            "title": "Accounts Merge",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/accounts-merge/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Union accounts sharing identical email address using DSU on account indices."
          },
          {
            "id": "s15_47",
            "title": "Number of Islands II (Online queries)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/number-of-islands-ii/",
            "companies": [
              "Google"
            ],
            "hint": "Convert (r, c) to 1D index r*m + c; union with adjacent land neighbors dynamically."
          },
          {
            "id": "s15_48",
            "title": "Making A Large Island (Flip at most one 0 to 1)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/making-a-large-island/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Color components with unique ID, store sizes. For each 0, sum unique adjacent component sizes + 1."
          },
          {
            "id": "s15_49",
            "title": "Swim in Rising Water",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/swim-in-rising-water/",
            "companies": [
              "Google"
            ],
            "hint": "Dijkstra or Binary Search + BFS, or Kruskal's DSU adding cells by elevation."
          }
        ]
      },
      {
        "name": "Lec 6: Other Graph Algorithms",
        "problems": [
          {
            "id": "s15_50",
            "title": "Bridges in a Graph (Tarjan's Algorithm)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/critical-connections-in-a-network/",
            "companies": [
              "Amazon"
            ],
            "hint": "tin[] and low[] arrays: edge u-v is a bridge if low[v] > tin[u]."
          },
          {
            "id": "s15_51",
            "title": "Articulation Point in Graph",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/critical-connections-in-a-network/",
            "companies": [
              "Amazon"
            ],
            "hint": "Node u is articulation point if low[v] >= tin[u] and parent != -1 (or root with >=2 children)."
          },
          {
            "id": "s15_52",
            "title": "Strongly Connected Components (Kosaraju's Algorithm)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/critical-connections-in-a-network/",
            "companies": [
              "Amazon"
            ],
            "hint": "1. Sort by finish time (DFS stack); 2. Transpose graph; 3. DFS in stack order."
          },
          {
            "id": "s15_53",
            "title": "Eulerian Path and Circuit",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/reconstruct-itinerary/",
            "companies": [
              "Google"
            ],
            "hint": "Hierholzer's algorithm: in-degree == out-degree for circuit, or at most 2 nodes differ by 1 for path."
          },
          {
            "id": "s15_54",
            "title": "Clone Graph",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/clone-graph/",
            "companies": [
              "Facebook",
              "Amazon"
            ],
            "hint": "Hash map from original node to cloned copy with DFS."
          }
        ]
      }
    ]
  },
  {
    "step": 16,
    "title": "Step 16: Dynamic Programming [1D, 2D, Strings, Stocks, LIS, MCM]",
    "description": "Optimal substructure, memoization, tabulation, and state compression across all interview patterns.",
    "topics": [
      {
        "name": "Lec 1: 1D DP",
        "problems": [
          {
            "id": "s16_1",
            "title": "Introduction to DP (Memoization vs Tabulation)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/fibonacci-number/",
            "companies": [
              "TCS"
            ],
            "hint": "Top-down memoization vs bottom-up tabulation; overlapping subproblems."
          },
          {
            "id": "s16_2",
            "title": "Climbing Stairs",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/climbing-stairs/",
            "companies": [
              "Amazon",
              "Apple",
              "Barclays"
            ],
            "hint": "dp[i] = dp[i-1] + dp[i-2]. Two variables O(1) space."
          },
          {
            "id": "s16_3",
            "title": "Frog Jump (Energy loss)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/frog-jump/",
            "companies": [
              "Google"
            ],
            "hint": "dp[i] = min(dp[i-1] + abs(h[i]-h[i-1]), dp[i-2] + abs(h[i]-h[i-2]))."
          },
          {
            "id": "s16_4",
            "title": "Frog Jump with K distances",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/frog-jump/",
            "companies": [
              "Google"
            ],
            "hint": "Loop j from 1 to K: dp[i] = min(dp[i - j] + abs(h[i] - h[i-j]))."
          },
          {
            "id": "s16_5",
            "title": "Maximum Sum of Non-Adjacent Elements (House Robber I)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/house-robber/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "rob[i] = max(rob[i-1], arr[i] + rob[i-2]). O(1) space."
          },
          {
            "id": "s16_6",
            "title": "House Robber II (Circular Houses)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/house-robber-ii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Run House Robber twice: once for nums[0..N-2], once for nums[1..N-1]."
          }
        ]
      },
      {
        "name": "Lec 2: 2D/3D DP and DP on Grids",
        "problems": [
          {
            "id": "s16_7",
            "title": "Ninja's Training (2D Activity Points)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/house-robber/",
            "companies": [
              "Amazon"
            ],
            "hint": "dp[day][lastTask] = max(points[day][task] + dp[day-1][task])."
          },
          {
            "id": "s16_8",
            "title": "Grid Unique Paths I",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/unique-paths/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "dp[i][j] = dp[i-1][j] + dp[i][j-1], or combinations C(m+n-2, m-1)."
          },
          {
            "id": "s16_9",
            "title": "Grid Unique Paths II (With Obstacles)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/unique-paths-ii/",
            "companies": [
              "Amazon"
            ],
            "hint": "If grid[i][j] == 1: dp[i][j] = 0; else sum from top and left."
          },
          {
            "id": "s16_10",
            "title": "Minimum Path Sum in Grid",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/minimum-path-sum/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])."
          },
          {
            "id": "s16_11",
            "title": "Triangle Path Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/triangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Bottom-up tabulation: dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])."
          },
          {
            "id": "s16_12",
            "title": "Minimum / Maximum Falling Path Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/minimum-falling-path-sum/",
            "companies": [
              "Google"
            ],
            "hint": "dp[i][j] = matrix[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1])."
          },
          {
            "id": "s16_13",
            "title": "Chocolate Pickup (3D DP - Cherry Pickup II)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/cherry-pickup-ii/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "dp[i][j1][j2]: both robots move row i simultaneously with 3x3=9 movement combinations."
          }
        ]
      },
      {
        "name": "Lec 3: DP on Subsequences",
        "problems": [
          {
            "id": "s16_14",
            "title": "Subset Sum Equal to Target",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/partition-equal-subset-sum/",
            "companies": [
              "Amazon"
            ],
            "hint": "dp[i][target] = dp[i-1][target] || dp[i-1][target - arr[i]]."
          },
          {
            "id": "s16_15",
            "title": "Partition Equal Subset Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/partition-equal-subset-sum/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "If sum is odd return false; target = sum / 2 subset sum problem."
          },
          {
            "id": "s16_16",
            "title": "Partition Array into Two Arrays to Minimize Sum Difference",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/",
            "companies": [
              "Amazon"
            ],
            "hint": "Meet-in-the-middle for large N, or DP boolean table last row scan for small bounds."
          },
          {
            "id": "s16_17",
            "title": "Count Subsets with Sum K",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "companies": [
              "Amazon"
            ],
            "hint": "dp[i][k] = dp[i-1][k] + dp[i-1][k - arr[i]]. Handle zeroes carefully."
          },
          {
            "id": "s16_18",
            "title": "Count Partitions With Given Difference",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/target-sum/",
            "companies": [
              "Amazon"
            ],
            "hint": "S1 - S2 = D and S1 + S2 = Total -> S1 = (Total + D) / 2."
          },
          {
            "id": "s16_19",
            "title": "0/1 Knapsack Problem",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/partition-equal-subset-sum/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "dp[w] = max(dp[w], val[i] + dp[w - wt[i]]) traversed backwards for 1D space."
          },
          {
            "id": "s16_20",
            "title": "Coin Change (Minimum coins to make sum)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/coin-change/",
            "companies": [
              "Amazon",
              "Google",
              "Microsoft",
              "Morgan Stanley"
            ],
            "hint": "dp[amt] = min(dp[amt], 1 + dp[amt - coin]). Unbounded knapsack."
          },
          {
            "id": "s16_21",
            "title": "Target Sum (+ / - operators)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/target-sum/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Isomorphic to Count Partitions With Given Difference: P - N = target."
          },
          {
            "id": "s16_22",
            "title": "Coin Change II (Number of combinations to make sum)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/coin-change-ii/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "dp[amt] += dp[amt - coin] traversed forward for unbounded knapsack."
          },
          {
            "id": "s16_23",
            "title": "Unbounded Knapsack",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/coin-change-ii/",
            "companies": [
              "Amazon"
            ],
            "hint": "dp[w] = max(dp[w], val[i] + dp[w - wt[i]]) traversed forward in 1D array."
          },
          {
            "id": "s16_24",
            "title": "Rod Cutting Problem",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/integer-break/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "dp[len] = max(dp[len], price[i] + dp[len - (i + 1)])."
          }
        ]
      },
      {
        "name": "Lec 4: DP on Strings",
        "problems": [
          {
            "id": "s16_25",
            "title": "Longest Common Subsequence (LCS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-common-subsequence/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "If s1[i] == s2[j]: 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1])."
          },
          {
            "id": "s16_26",
            "title": "Print Longest Common Subsequence",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-common-subsequence/",
            "companies": [
              "Amazon"
            ],
            "hint": "Backtrack through LCS table from (m, n): move diagonally on character match."
          },
          {
            "id": "s16_27",
            "title": "Longest Common Substring",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
            "companies": [
              "Amazon"
            ],
            "hint": "If s1[i] == s2[j]: dp[i][j] = 1 + dp[i-1][j-1]; else reset dp[i][j] = 0."
          },
          {
            "id": "s16_28",
            "title": "Longest Palindromic Subsequence",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-palindromic-subsequence/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "LCS of string s and its reverse reverse(s)."
          },
          {
            "id": "s16_29",
            "title": "Minimum insertions to make string palindrome",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "Answer = n - Longest Palindromic Subsequence(s)."
          },
          {
            "id": "s16_30",
            "title": "Minimum operations to convert string A to string B",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/delete-operation-for-two-strings/",
            "companies": [
              "Amazon"
            ],
            "hint": "(len(A) - LCS) deletions + (len(B) - LCS) insertions."
          },
          {
            "id": "s16_31",
            "title": "Shortest Common Supersequence",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/shortest-common-supersequence/",
            "companies": [
              "Google"
            ],
            "hint": "Length = m + n - LCS. Trace LCS table including unmatched characters."
          },
          {
            "id": "s16_32",
            "title": "Distinct Subsequences",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/distinct-subsequences/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "If s[i] == t[j]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; else dp[i-1][j]."
          },
          {
            "id": "s16_33",
            "title": "Edit Distance (Levenshtein)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/edit-distance/",
            "companies": [
              "Google",
              "Amazon",
              "Microsoft"
            ],
            "hint": "If s[i] == t[j]: dp[i-1][j-1]; else 1 + min(insert: dp[i][j-1], delete: dp[i-1][j], replace: dp[i-1][j-1])."
          },
          {
            "id": "s16_34",
            "title": "Wildcard Matching ('?' and '*')",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/wildcard-matching/",
            "companies": [
              "Facebook",
              "Google"
            ],
            "hint": "'*' matches 0 characters (dp[i][j-1]) or matches 1+ characters (dp[i-1][j])."
          }
        ]
      },
      {
        "name": "Lec 5: DP on Stocks",
        "problems": [
          {
            "id": "s16_35",
            "title": "Best Time to Buy and Sell Stock I (At most 1 transaction)",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            "companies": [
              "Amazon",
              "Apple"
            ],
            "hint": "Track min_price seen so far; max_profit = max(profit, price - min_price)."
          },
          {
            "id": "s16_36",
            "title": "Best Time to Buy and Sell Stock II (Unlimited transactions)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
            "companies": [
              "Amazon"
            ],
            "hint": "Greedy: add price[i] - price[i-1] whenever positive, or state machine dp[buy]."
          },
          {
            "id": "s16_37",
            "title": "Best Time to Buy and Sell Stock III (At most 2 transactions)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
            "companies": [
              "Amazon",
              "Google"
            ],
            "hint": "dp[day][buy][cap]: cap runs from 2 down to 1."
          },
          {
            "id": "s16_38",
            "title": "Best Time to Buy and Sell Stock IV (At most K transactions)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
            "companies": [
              "Amazon"
            ],
            "hint": "dp[day][buy][cap] with cap = k; space compress to 2D array."
          },
          {
            "id": "s16_39",
            "title": "Best Time to Buy and Sell Stock with Cooldown (1 day cooldown)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
            "companies": [
              "Google"
            ],
            "hint": "On sell: jump to day + 2 for next buy option."
          },
          {
            "id": "s16_40",
            "title": "Best Time to Buy and Sell Stock with Transaction Fee",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
            "companies": [
              "Facebook"
            ],
            "hint": "Subtract fee on selling: sell = max(sell, buy + price - fee)."
          }
        ]
      },
      {
        "name": "Lec 6: DP on LIS (Longest Increasing Subsequence)",
        "problems": [
          {
            "id": "s16_41",
            "title": "Longest Increasing Subsequence (LIS)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-increasing-subsequence/",
            "companies": [
              "Google",
              "Amazon",
              "Microsoft"
            ],
            "hint": "O(N log N) using tails array and binary search (bisect_left / lower_bound)."
          },
          {
            "id": "s16_42",
            "title": "Print Longest Increasing Subsequence",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-increasing-subsequence/",
            "companies": [
              "Amazon"
            ],
            "hint": "Maintain hash array tracking parent index of predecessor in LIS."
          },
          {
            "id": "s16_43",
            "title": "Largest Divisible Subset",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/largest-divisible-subset/",
            "companies": [
              "Google"
            ],
            "hint": "Sort array first: if nums[i] % nums[prev] == 0, extend divisible subset."
          },
          {
            "id": "s16_44",
            "title": "Longest String Chain",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-string-chain/",
            "companies": [
              "Google"
            ],
            "hint": "Sort by string length; hash map dp[word] = 1 + max(dp[predecessor])."
          },
          {
            "id": "s16_45",
            "title": "Longest Bitonic Subsequence",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/",
            "companies": [
              "Amazon"
            ],
            "hint": "Compute LIS from left dp1[] and LIS from right dp2[]; max(dp1[i] + dp2[i] - 1)."
          },
          {
            "id": "s16_46",
            "title": "Number of Longest Increasing Subsequences",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
            "companies": [
              "Facebook"
            ],
            "hint": "Maintain count[] alongside length[]: if equal length found, count[i] += count[prev]."
          },
          {
            "id": "s16_47",
            "title": "Russian Doll Envelopes",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/russian-doll-envelopes/",
            "companies": [
              "Google"
            ],
            "hint": "Sort width ascending, height descending; run LIS on heights in O(N log N)."
          },
          {
            "id": "s16_48",
            "title": "Maximum Length of Pair Chain",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-length-of-pair-chain/",
            "companies": [
              "Amazon"
            ],
            "hint": "Sort by end time ascending; greedy pick if start > prev_end."
          }
        ]
      },
      {
        "name": "Lec 7: MCM / Partition DP",
        "problems": [
          {
            "id": "s16_49",
            "title": "Matrix Chain Multiplication (MCM)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/burst-balloons/",
            "companies": [
              "Amazon",
              "Microsoft"
            ],
            "hint": "Partition cut k from i to j-1: dp[i][j] = min(dp[i][k] + dp[k+1][j] + arr[i-1]*arr[k]*arr[j])."
          },
          {
            "id": "s16_50",
            "title": "Minimum Cost to Cut a Stick",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
            "companies": [
              "Google"
            ],
            "hint": "Sort cuts, pad with 0 and stick length n. dp[i][j] = cost + min cut k."
          },
          {
            "id": "s16_51",
            "title": "Burst Balloons",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/burst-balloons/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Think backwards: which balloon is burst LAST in range (i, j)."
          },
          {
            "id": "s16_52",
            "title": "Palindrome Partitioning II (Minimum Cuts)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/palindrome-partitioning-ii/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Front partition: dp[i] = min cuts for substring i..N. If isPalin(i..j): 1 + dp[j+1]."
          },
          {
            "id": "s16_53",
            "title": "Partition Array for Maximum Sum",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/partition-array-for-maximum-sum/",
            "companies": [
              "Amazon"
            ],
            "hint": "Loop partition length 1..k: dp[i] = max(max_val * len + dp[i + len])."
          },
          {
            "id": "s16_54",
            "title": "Maximal Rectangle in Binary Matrix (DP on Squares)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/maximal-rectangle/",
            "companies": [
              "Amazon"
            ],
            "hint": "Largest Rectangle in Histogram on each cumulative row."
          },
          {
            "id": "s16_55",
            "title": "Count Square Submatrices with All Ones",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
            "companies": [
              "Google"
            ],
            "hint": "dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]); sum all dp[i][j]."
          },
          {
            "id": "s16_56",
            "title": "Unique Paths in Grid",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/unique-paths/",
            "companies": [
              "Amazon"
            ],
            "hint": "dp[i][j] = dp[i-1][j] + dp[i][j-1] with 1D row memory."
          }
        ]
      }
    ]
  },
  {
    "step": 17,
    "title": "Step 17: Tries [Theory & Practice Problems]",
    "description": "Prefix trees, auto-complete, prefix counts, and bitwise maximum XOR.",
    "topics": [
      {
        "name": "Lec 1: Theory and Implementation",
        "problems": [
          {
            "id": "s17_1",
            "title": "Implement Trie I (Prefix Tree - Insert, Search, StartsWith)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
            "companies": [
              "Google",
              "Amazon",
              "Microsoft"
            ],
            "hint": "TrieNode with array links[26] and isEnd flag."
          },
          {
            "id": "s17_2",
            "title": "Implement Trie II (Prefix with countWordsEqualTo and countWordsStartingWith)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/implement-trie-ii-prefix-tree/",
            "companies": [
              "Amazon"
            ],
            "hint": "TrieNode maintains ew (ends with count) and cp (count prefix)."
          },
          {
            "id": "s17_3",
            "title": "Longest Word With All Prefixes (Complete String)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/longest-word-in-dictionary/",
            "companies": [
              "Amazon"
            ],
            "hint": "Insert all words in Trie; check if every prefix node has isEnd == true."
          }
        ]
      },
      {
        "name": "Lec 2: Practice Problems",
        "problems": [
          {
            "id": "s17_4",
            "title": "Number of Distinct Substrings in a String using Trie",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/",
            "companies": [
              "Amazon"
            ],
            "hint": "Insert all suffixes into Trie: total nodes created equals distinct substrings count."
          },
          {
            "id": "s17_5",
            "title": "Bit Pre-requisites for TRIE Problems",
            "difficulty": "Easy",
            "leetcode_url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            "companies": [
              "Google"
            ],
            "hint": "Binary Trie with 0 and 1 links from bit 31 down to 0."
          },
          {
            "id": "s17_6",
            "title": "Maximum XOR of Two Numbers in an Array",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "Insert numbers into 32-bit Trie; query opposite bit (1 - bit) to maximize XOR."
          },
          {
            "id": "s17_7",
            "title": "Maximum XOR With an Element From Array (Offline Queries)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
            "companies": [
              "Google"
            ],
            "hint": "Sort queries and array by constraint m; greedily insert <= m into Trie."
          }
        ]
      }
    ]
  },
  {
    "step": 18,
    "title": "Step 18: Advanced Strings Algorithms",
    "description": "Pattern matching algorithms, KMP, Z-algorithm, Rabin-Karp, and Manacher's algorithm.",
    "topics": [
      {
        "name": "Advanced Pattern Matching",
        "problems": [
          {
            "id": "s18_1",
            "title": "Find the Index of the First Occurrence in a String (KMP Algorithm)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
            "companies": [
              "Google",
              "Microsoft"
            ],
            "hint": "Compute LPS (Longest Proper Prefix which is also Suffix) array for O(N + M) search."
          },
          {
            "id": "s18_2",
            "title": "Z-Algorithm for Pattern Searching",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
            "companies": [
              "Google"
            ],
            "hint": "Z-box window [L, R] tracking longest prefix match starting at index i in O(N)."
          },
          {
            "id": "s18_3",
            "title": "Shortest Palindrome (KMP LPS on s + '#' + rev)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/shortest-palindrome/",
            "companies": [
              "Google",
              "Amazon"
            ],
            "hint": "LPS of (s + '#' + reverse(s)) gives longest palindromic prefix."
          },
          {
            "id": "s18_4",
            "title": "Longest Happy Prefix (KMP LPS)",
            "difficulty": "Hard",
            "leetcode_url": "https://leetcode.com/problems/longest-happy-prefix/",
            "companies": [
              "Google"
            ],
            "hint": "Last value in KMP LPS array gives longest proper prefix that is also a suffix."
          },
          {
            "id": "s18_5",
            "title": "Rabin-Karp Algorithm for Pattern Matching (Rolling Hash)",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/repeated-string-match/",
            "companies": [
              "Amazon"
            ],
            "hint": "Polynomial rolling hash with large prime modulus: compare hash in O(1)."
          },
          {
            "id": "s18_6",
            "title": "Repeated String Match",
            "difficulty": "Medium",
            "leetcode_url": "https://leetcode.com/problems/repeated-string-match/",
            "companies": [
              "Google"
            ],
            "hint": "Repeat string a until length >= b; check if b is substring, repeat once more if needed."
          }
        ]
      }
    ]
  }
];
