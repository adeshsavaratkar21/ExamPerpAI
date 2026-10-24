import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Copy, 
  Layers, 
  Cpu, 
  Server, 
  Laptop, 
  Database, 
  ShieldCheck, 
  ArrowDown, 
  ArrowUp,
  Zap,
  Globe,
  Lock,
  Boxes,
  Code
} from 'lucide-react';

export default function AdvancedTopicVisual({ topicTitle, codeSnippet, subjectCode }) {
  const [activeHandshakeStep, setActiveHandshakeStep] = useState(0); // 0 = all, 1 = SYN, 2 = SYN-ACK, 3 = ACK
  const [handshakeMode, setHandshakeMode] = useState('connect'); // 'connect' (3-way) | 'teardown' (4-way)
  const [selectedLayer, setSelectedLayer] = useState(4); // Default to Transport L4
  const [activeJoinType, setActiveJoinType] = useState('inner'); // 'inner' | 'left' | 'right' | 'full'
  const [selectedOopsPillar, setSelectedOopsPillar] = useState('encapsulation');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!codeSnippet) return;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. TCP 3-WAY HANDSHAKE & TEARDOWN INTERACTIVE PROTOCOL SIMULATOR (LIGHT THEME)
  if (topicTitle?.includes('TCP 3-Way Handshake') || topicTitle?.includes('Handshake')) {
    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs overflow-hidden">
        {/* Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-2xs">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black tracking-tight text-gray-900 flex items-center gap-2">
                <span>TCP Connection Protocol Visualizer</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                  INTERACTIVE
                </span>
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                Bidirectional sequence number synchronization & state machine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => {
                setHandshakeMode('connect');
                setActiveHandshakeStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                handshakeMode === 'connect'
                  ? 'bg-amber-400 text-gray-950 font-black shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              3-Way SYN Handshake
            </button>
            <button
              onClick={() => {
                setHandshakeMode('teardown');
                setActiveHandshakeStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                handshakeMode === 'teardown'
                  ? 'bg-amber-400 text-gray-950 font-black shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              4-Way FIN Teardown
            </button>
          </div>
        </div>

        {/* Visual Sequence Flow Diagram */}
        <div className="my-6 relative">
          {/* Host Nodes Bar */}
          <div className="flex items-center justify-between px-2 sm:px-10 mb-8">
            {/* Client Node */}
            <div className="flex flex-col items-center gap-1.5 bg-white border-2 border-indigo-200 rounded-2xl p-3 shadow-2xs w-36 sm:w-44 text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-xs font-black tracking-tight text-gray-900">Client (Initiator)</span>
              <span className="text-[10px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                192.168.1.10 : 54321
              </span>
              <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 mt-0.5">
                {handshakeMode === 'connect' ? (activeHandshakeStep >= 3 ? 'ESTABLISHED' : activeHandshakeStep === 1 ? 'SYN_SENT' : 'CLOSED') : (activeHandshakeStep >= 4 ? 'CLOSED' : activeHandshakeStep >= 1 ? 'FIN_WAIT_1' : 'ESTABLISHED')}
              </span>
            </div>

            {/* Middle Channel Indicator */}
            <div className="flex flex-col items-center gap-1">
              <div className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-mono text-gray-700 flex items-center gap-1.5 shadow-2xs">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Full-Duplex Stream</span>
                <span className="sm:hidden">Duplex</span>
              </div>
              <div className="text-[10px] text-gray-400 font-medium hidden sm:block">RTT ~18ms • Clean Link</div>
            </div>

            {/* Server Node */}
            <div className="flex flex-col items-center gap-1.5 bg-white border-2 border-emerald-200 rounded-2xl p-3 shadow-2xs w-36 sm:w-44 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-xs font-black tracking-tight text-gray-900">Server (Receiver)</span>
              <span className="text-[10px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                10.0.0.1 : 443 (HTTPS)
              </span>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 mt-0.5">
                {handshakeMode === 'connect' ? (activeHandshakeStep >= 2 ? 'ESTABLISHED' : activeHandshakeStep === 1 ? 'SYN_RCVD' : 'LISTEN') : (activeHandshakeStep >= 3 ? 'CLOSED' : activeHandshakeStep >= 1 ? 'CLOSE_WAIT' : 'ESTABLISHED')}
              </span>
            </div>
          </div>

          {/* Sequence Arrows Timeline */}
          {handshakeMode === 'connect' ? (
            <div className="space-y-3.5 px-1 sm:px-6">
              {/* Step 1: Client -> Server (SYN) */}
              <div 
                onClick={() => setActiveHandshakeStep(1)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeHandshakeStep === 1 || activeHandshakeStep === 0
                    ? 'bg-white border-2 border-indigo-400 shadow-sm'
                    : 'bg-white/60 border border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                      1
                    </span>
                    <span className="text-indigo-900 font-black">Step 1: Synchronize Request</span>
                  </div>
                  <span className="font-mono text-[11px] text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200 font-bold">
                    FLAG: [SYN] • Seq = 100
                  </span>
                </div>
                
                {/* Visual Arrow Track */}
                <div className="relative flex items-center py-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-indigo-600 -mr-1" />
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0" />
                </div>
                
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Client picks random initial sequence number (<code className="text-indigo-800 font-bold bg-indigo-50 px-1 py-0.5 rounded">ISN = 100</code>). Asks server to establish connection. Server transitions state: <code className="text-amber-800 font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">LISTEN ➔ SYN_RCVD</code>.
                </p>
              </div>

              {/* Step 2: Server -> Client (SYN-ACK) */}
              <div 
                onClick={() => setActiveHandshakeStep(2)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeHandshakeStep === 2 || activeHandshakeStep === 0
                    ? 'bg-white border-2 border-emerald-400 shadow-sm'
                    : 'bg-white/60 border border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                      2
                    </span>
                    <span className="text-emerald-900 font-black">Step 2: Sync-Acknowledgment Reply</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 font-bold">
                    FLAGS: [SYN, ACK] • Seq = 300, Ack = 101
                  </span>
                </div>

                {/* Visual Arrow Track (Right to Left) */}
                <div className="relative flex items-center py-1 flex-row-reverse">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <div className="flex-1 h-0.5 bg-gradient-to-l from-emerald-500 via-emerald-400 to-emerald-300 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                      <ArrowLeft className="w-4 h-4 text-emerald-600 -ml-1" />
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                </div>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Server acknowledges client's sequence (<code className="text-emerald-800 font-bold bg-emerald-50 px-1 py-0.5 rounded">Ack = 100 + 1 = 101</code>) and generates its own server ISN (<code className="text-emerald-800 font-bold bg-emerald-50 px-1 py-0.5 rounded">Seq = 300</code>). Client transitions state: <code className="text-emerald-800 font-bold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">SYN_SENT ➔ ESTABLISHED</code>.
                </p>
              </div>

              {/* Step 3: Client -> Server (ACK) */}
              <div 
                onClick={() => setActiveHandshakeStep(3)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeHandshakeStep === 3 || activeHandshakeStep === 0
                    ? 'bg-white border-2 border-amber-400 shadow-sm'
                    : 'bg-white/60 border border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center text-[10px] font-black">
                      3
                    </span>
                    <span className="text-amber-950 font-black">Step 3: Final Connection Acknowledgment</span>
                  </div>
                  <span className="font-mono text-[11px] text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-300 font-bold">
                    FLAG: [ACK] • Seq = 101, Ack = 301
                  </span>
                </div>

                {/* Visual Arrow Track */}
                <div className="relative flex items-center py-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-amber-600 -mr-1" />
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                </div>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Client acknowledges server sequence (<code className="text-amber-800 font-bold bg-amber-50 px-1 py-0.5 rounded">Ack = 300 + 1 = 301</code>). Server transitions state: <code className="text-emerald-800 font-bold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">SYN_RCVD ➔ ESTABLISHED</code>. Bidirectional data payload transmission begins!
                </p>
              </div>
            </div>
          ) : (
            /* 4-WAY FIN TEARDOWN */
            <div className="space-y-3 px-1 sm:px-6">
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-xs shadow-2xs">
                <span className="text-rose-700 font-extrabold block mb-1">1. Client ➔ Server: FIN (seq = u)</span>
                <p className="text-gray-600 text-xs">Client has no more data to send; initiates graceful teardown. Client state: <code className="bg-gray-100 px-1 rounded font-bold">FIN_WAIT_1</code>.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-xs shadow-2xs">
                <span className="text-amber-700 font-extrabold block mb-1">2. Server ➔ Client: ACK (ack = u + 1)</span>
                <p className="text-gray-600 text-xs">Server acknowledges FIN. Client enters <code className="bg-gray-100 px-1 rounded font-bold">FIN_WAIT_2</code>. Server enters <code className="bg-gray-100 px-1 rounded font-bold">CLOSE_WAIT</code> (finishes sending pending data).</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-xs shadow-2xs">
                <span className="text-rose-700 font-extrabold block mb-1">3. Server ➔ Client: FIN (seq = v)</span>
                <p className="text-gray-600 text-xs">Server finishes its transmission and closes its side. Server state: <code className="bg-gray-100 px-1 rounded font-bold">LAST_ACK</code>.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-xs shadow-2xs">
                <span className="text-emerald-700 font-extrabold block mb-1">4. Client ➔ Server: ACK (ack = v + 1) • TIME_WAIT (2*MSL)</span>
                <p className="text-gray-600 text-xs">Client sends final ACK and waits 2*MSL (120s) before terminating socket to ensure final ACK was safely received.</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Legend & Key Interview Takeaway */}
        <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              SYN (Synchronize)
            </span>
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              ACK (Acknowledge)
            </span>
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              FIN (Finish)
            </span>
          </div>
          <span className="text-amber-900 font-extrabold bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            ⭐ Why 3-way? Prevents old delayed duplicate SYNs from allocating phantom server memory.
          </span>
        </div>
      </div>
    );
  }

  // 2. OSI 7 LAYERS VS TCP/IP 4 LAYERS ARCHITECTURAL PROTOCOL STACK (LIGHT THEME)
  if (topicTitle?.includes('OSI vs TCP/IP') || topicTitle?.includes('Protocol Suites')) {
    const protocolLayers = [
      {
        layer: 7,
        osi: "Application",
        tcp: "Application",
        pdu: "Data",
        protocols: "HTTP, HTTPS, DNS, SSH, FTP, SMTP, WebSockets",
        address: "Process / URL Domain",
        badge: "L7"
      },
      {
        layer: 6,
        osi: "Presentation",
        tcp: "Application",
        pdu: "Data",
        protocols: "SSL/TLS, ASCII, JPEG, JSON, Protobuf",
        address: "Data Syntax / Compression / Encryption",
        badge: "L6"
      },
      {
        layer: 5,
        osi: "Session",
        tcp: "Application",
        pdu: "Data",
        protocols: "RPC, NetBIOS, PPTP, Sockets Session",
        address: "Session Token / Checkpointing",
        badge: "L5"
      },
      {
        layer: 4,
        osi: "Transport",
        tcp: "Transport (Host-to-Host)",
        pdu: "Segment (TCP) / Datagram (UDP)",
        protocols: "TCP (Reliable, Flow/Congestion Control), UDP (Low Latency)",
        address: "Port Numbers (e.g. 80, 443, 22, 3306)",
        badge: "L4 • End-to-End"
      },
      {
        layer: 3,
        osi: "Network",
        tcp: "Internet",
        pdu: "Packet",
        protocols: "IPv4, IPv6, ICMP, OSPF, BGP, Routers",
        address: "IP Address (IPv4: 32-bit, IPv6: 128-bit)",
        badge: "L3 • Host-to-Host"
      },
      {
        layer: 2,
        osi: "Data Link",
        tcp: "Network Access (Link)",
        pdu: "Frame",
        protocols: "Ethernet (IEEE 802.3), Wi-Fi (802.11), Switches, ARP",
        address: "MAC Address (48-bit Hex, e.g. 00:1A:2B:3C:4D:5E)",
        badge: "L2 • Node-to-Node"
      },
      {
        layer: 1,
        osi: "Physical",
        tcp: "Network Access (Link)",
        pdu: "Bits (0s & 1s)",
        protocols: "Fiber Optics, Copper CAT6, RF Radio, Hubs, Repeaters",
        address: "Voltage Levels / Optical pulses / Frequencies",
        badge: "L1 • Hardware"
      }
    ];

    const currentLayerInfo = protocolLayers.find(l => l.layer === selectedLayer) || protocolLayers[3];

    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-900 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-gray-900">
                OSI 7-Layer vs TCP/IP 4-Layer Architecture Stack
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                Click any layer to inspect protocol data units (PDU), protocols, and addressing schemes.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-side Protocol Ladder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Stack Ladder Column */}
          <div className="lg:col-span-7 space-y-2">
            {protocolLayers.map((l) => {
              const isSelected = selectedLayer === l.layer;

              return (
                <div
                  key={l.layer}
                  onClick={() => setSelectedLayer(l.layer)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/90 border-2 border-amber-400 shadow-xs scale-[1.01]'
                      : 'bg-white border-gray-200 hover:border-amber-300 hover:bg-gray-50/60 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${
                      isSelected ? 'bg-amber-400 text-gray-950' : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {l.layer}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-900 truncate">
                          {l.osi} Layer
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 hidden sm:inline">
                          ➔ TCP/IP: {l.tcp}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 block truncate font-mono">
                        {l.protocols}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border block ${
                      isSelected 
                        ? 'bg-amber-200/80 text-amber-950 border-amber-300' 
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {l.pdu}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Inspection Card Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Layer {currentLayerInfo.layer}: {currentLayerInfo.osi}
              </span>
              <span className="text-[10px] font-extrabold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                {currentLayerInfo.badge}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                  Protocol Data Unit (PDU)
                </span>
                <span className="font-mono text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                  {currentLayerInfo.pdu}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                  Addressing Scheme
                </span>
                <span className="font-mono text-blue-800 font-bold text-[11px] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 block">
                  {currentLayerInfo.address}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                  Primary Protocols & Hardware
                </span>
                <p className="text-gray-700 text-[11px] font-mono leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                  {currentLayerInfo.protocols}
                </p>
              </div>

              {/* Encapsulation pipeline reminder */}
              <div className="pt-2 border-t border-gray-200 text-[10px] text-gray-500">
                <span className="font-extrabold text-gray-900 block mb-1">Encapsulation Flow:</span>
                <code className="text-amber-900 font-mono text-[10px] block bg-amber-50 p-2 rounded-xl border border-amber-200 font-bold">
                  Data ➔ [L4 Segment] ➔ [L3 Packet] ➔ [L2 Frame] ➔ [L1 Bits]
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. OS PROCESS VIRTUAL ADDRESS SPACE (STACK VS HEAP MEMORY MODEL) (LIGHT THEME)
  if (topicTitle?.includes('Process vs Thread') || topicTitle?.includes('Address Space') || topicTitle?.includes('Virtual Memory')) {
    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-900 shadow-2xs">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-gray-900">
                Process Virtual Memory Architecture (32-bit / 64-bit)
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                Stack & Heap dynamic boundaries, uninitialized BSS, and Code segments.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            0xFFFFFFFF ➔ 0x00000000
          </span>
        </div>

        {/* Visual Architectural Memory Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Memory Tower */}
          <div className="md:col-span-7 space-y-2 font-mono text-xs">
            {/* High Memory Bound */}
            <div className="flex items-center justify-between text-[10px] text-purple-700 px-1 font-bold">
              <span>0xFFFFFFFF (High Address)</span>
              <span>Kernel Space (1GB on 32-bit)</span>
            </div>

            {/* Stack Segment */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-rose-900 text-xs">STACK SEGMENT (Call Frames & Locals)</span>
                <span className="flex items-center gap-1 text-[10px] text-rose-700 font-extrabold">
                  Grows Down <ArrowDown className="w-3 h-3 text-rose-600 animate-bounce" />
                </span>
              </div>
              <p className="text-[11px] text-gray-700 font-sans mt-1 leading-relaxed">
                Stores function activation records, local variables, return pointers. Fast LIFO memory. Stack Overflow occurs if recursion exceeds limit.
              </p>
            </div>

            {/* Dynamic Growth Gap */}
            <div className="py-2.5 px-4 rounded-xl border border-dashed border-gray-300 bg-white flex items-center justify-between text-[11px] text-gray-500 font-semibold shadow-2xs">
              <span className="flex items-center gap-1 font-sans text-rose-700">
                <ArrowDown className="w-3.5 h-3.5" /> Stack Growth
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Shared Unmapped Virtual Gap
              </span>
              <span className="flex items-center gap-1 font-sans text-emerald-700">
                Heap Growth <ArrowUp className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Heap Segment */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-900 text-xs">HEAP SEGMENT (Dynamic Allocation)</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-extrabold">
                  Grows Up <ArrowUp className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                </span>
              </div>
              <p className="text-[11px] text-gray-700 font-sans mt-1 leading-relaxed">
                Allocated at runtime via <code className="text-emerald-900 font-bold bg-white px-1 py-0.5 rounded border border-emerald-200">malloc() / calloc() / new</code>. Managed by garbage collector or explicit <code className="text-emerald-900 font-bold bg-white px-1 py-0.5 rounded border border-emerald-200">free() / delete</code>.
              </p>
            </div>

            {/* BSS Segment */}
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
              <span className="font-black text-amber-900">BSS SEGMENT</span>
              <span className="text-[10px] text-gray-600 font-sans font-medium">Uninitialized global and static variables (zero-initialized)</span>
            </div>

            {/* Data Segment */}
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
              <span className="font-black text-blue-900">DATA SEGMENT</span>
              <span className="text-[10px] text-gray-600 font-sans font-medium">Explicitly initialized global & static constants</span>
            </div>

            {/* Text Segment */}
            <div className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-between text-xs">
              <span className="font-black text-gray-900">TEXT / CODE SEGMENT</span>
              <span className="text-[10px] text-gray-600 font-sans font-medium">Compiled binary CPU machine instructions (Read-Only)</span>
            </div>

            {/* Low Memory Bound */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 px-1 font-bold">
              <span>0x00000000 (Low Address)</span>
              <span>NULL pointer trap zone</span>
            </div>
          </div>

          {/* Key Differences Summary Card */}
          <div className="md:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
            <h5 className="text-xs font-black text-gray-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Process vs Thread Core Distinction</span>
            </h5>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                <span className="font-black text-purple-900 block mb-0.5">Process (Heavyweight):</span>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Has its own isolated virtual address space (PCB, page table, open file descriptors). Crash in one process does not kill others.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="font-black text-emerald-900 block mb-0.5">Thread (Lightweight):</span>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Shares Code, Data, Heap with peer threads in the same process. Has its own private <strong className="text-gray-900">Stack, Registers, and Program Counter (PC)</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 font-medium">
                💡 <strong>Context Switch:</strong> Thread switch is much faster than process switch because memory mapping (page table / TLB) doesn't need to be flushed!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. SQL JOINS INTERACTIVE VENN VISUALIZER (LIGHT THEME)
  if (topicTitle?.includes('SQL Joins') || topicTitle?.includes('Joins')) {
    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-900 shadow-2xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-gray-900">
                SQL Joins Interactive Set Theory Engine
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                Select a join type to visualize row inclusion and Venn set intersections.
              </p>
            </div>
          </div>

          {/* Join Switcher */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs flex-wrap">
            {['inner', 'left', 'right', 'full'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveJoinType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase transition-all ${
                  activeJoinType === type
                    ? 'bg-amber-400 text-gray-950 font-black shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Venn Graphic & Query Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* SVG Venn Diagram */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs">
            <svg viewBox="0 0 280 180" className="w-full max-w-[240px] h-auto">
              {/* Left Circle (Table A) */}
              <circle
                cx="100"
                cy="90"
                r="65"
                className={`transition-all duration-300 ${
                  activeJoinType === 'left' || activeJoinType === 'full'
                    ? 'fill-amber-300/40 stroke-amber-500 stroke-2'
                    : 'fill-gray-100/60 stroke-gray-300 stroke-1'
                }`}
              />

              {/* Right Circle (Table B) */}
              <circle
                cx="180"
                cy="90"
                r="65"
                className={`transition-all duration-300 ${
                  activeJoinType === 'right' || activeJoinType === 'full'
                    ? 'fill-blue-300/40 stroke-blue-500 stroke-2'
                    : 'fill-gray-100/60 stroke-gray-300 stroke-1'
                }`}
              />

              {/* Intersection Path */}
              <path
                d="M 140,37 A 65,65 0 0,1 140,143 A 65,65 0 0,1 140,37"
                className={`transition-all duration-300 ${
                  activeJoinType === 'inner' || activeJoinType === 'left' || activeJoinType === 'right' || activeJoinType === 'full'
                    ? 'fill-amber-400 stroke-amber-600 stroke-2'
                    : 'fill-transparent'
                }`}
              />

              {/* Labels */}
              <text x="65" y="95" className="fill-gray-900 text-[12px] font-black" textAnchor="middle">
                Table A
              </text>
              <text x="215" y="95" className="fill-gray-900 text-[12px] font-black" textAnchor="middle">
                Table B
              </text>
              <text x="140" y="95" className="fill-gray-950 text-[11px] font-black" textAnchor="middle">
                MATCH
              </text>
            </svg>

            <span className="text-xs font-black text-amber-900 mt-2 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {activeJoinType.toUpperCase()} JOIN
            </span>
          </div>

          {/* Explanation & Live SQL Snippet */}
          <div className="md:col-span-7 space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs font-mono text-xs">
              <div className="text-gray-600 text-xs mb-2 font-sans font-medium">
                {activeJoinType === 'inner' && "Returns ONLY matching records existing in both Table A and Table B."}
                {activeJoinType === 'left' && "Returns ALL records from Table A, and matched records from Table B (NULL if no match)."}
                {activeJoinType === 'right' && "Returns ALL records from Table B, and matched records from Table A (NULL if no match)."}
                {activeJoinType === 'full' && "Returns ALL records when there is a match in either Table A or Table B."}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 leading-relaxed font-mono">
                <span className="text-indigo-600 font-black">SELECT</span> A.emp_id, A.name, B.dept_name<br />
                <span className="text-indigo-600 font-black">FROM</span> Employees A<br />
                <span className="text-amber-600 font-black">{activeJoinType.toUpperCase()} JOIN</span> Departments B<br />
                <span className="text-indigo-600 font-black">ON</span> A.dept_id = B.dept_id;
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center justify-between">
              <span>Performance Tip: Ensure join key (<code className="bg-white px-1 rounded border border-amber-300">dept_id</code>) is indexed for fast B+ Tree lookups!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. DEADLOCKS & 4 COFFMAN CONDITIONS VISUALIZER (LIGHT THEME)
  if (topicTitle?.includes('Deadlock') || topicTitle?.includes('Coffman')) {
    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-900 shadow-2xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-gray-900">
                Deadlock Resource Allocation Graph (RAG) & Circular Wait
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                All 4 Coffman conditions must hold simultaneously for a deadlock to exist.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            DEADLOCK CYCLE
          </span>
        </div>

        {/* Circular Wait Visual Cycle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-6 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col items-center justify-center">
            <div className="relative w-64 h-48 flex items-center justify-center">
              {/* Process P1 */}
              <div className="absolute top-2 left-4 px-3 py-1.5 rounded-xl bg-purple-100 border-2 border-purple-300 text-purple-950 text-xs font-black shadow-2xs">
                Process P1
              </div>
              {/* Resource R1 */}
              <div className="absolute top-2 right-4 px-3 py-1.5 rounded-xl bg-amber-100 border-2 border-amber-300 text-amber-950 text-xs font-black shadow-2xs">
                Resource R1
              </div>
              {/* Resource R2 */}
              <div className="absolute bottom-2 left-4 px-3 py-1.5 rounded-xl bg-amber-100 border-2 border-amber-300 text-amber-950 text-xs font-black shadow-2xs">
                Resource R2
              </div>
              {/* Process P2 */}
              <div className="absolute bottom-2 right-4 px-3 py-1.5 rounded-xl bg-purple-100 border-2 border-purple-300 text-purple-950 text-xs font-black shadow-2xs">
                Process P2
              </div>

              {/* Connecting Arrows indicating circular wait */}
              <div className="text-[11px] text-center font-mono text-gray-700 space-y-0.5">
                <span className="text-purple-700 font-bold block">P1 holds R1</span>
                <span className="text-amber-700 font-bold block">P1 requests R2</span>
                <span className="text-purple-700 font-bold block">P2 holds R2</span>
                <span className="text-amber-700 font-bold block">P2 requests R1</span>
                <span className="text-rose-700 font-black text-xs mt-1.5 block bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                  🔒 BLOCKED FOREVER
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 space-y-2 text-xs">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
              The 4 Mandatory Coffman Conditions:
            </span>
            {[
              { num: "1", title: "Mutual Exclusion", desc: "Resource cannot be shared (exclusive use only)." },
              { num: "2", title: "Hold & Wait", desc: "Process holds resource while requesting another." },
              { num: "3", title: "No Preemption", desc: "OS cannot forcibly revoke held resources." },
              { num: "4", title: "Circular Wait", desc: "Closed cycle of mutual resource dependency." }
            ].map(c => (
              <div key={c.num} className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  {c.num}
                </span>
                <div>
                  <span className="font-black text-gray-900 text-xs block">{c.title}</span>
                  <p className="text-[11px] text-gray-500 font-medium">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. ACID PROPERTIES & ISOLATION LEVELS VISUALIZER (LIGHT THEME)
  if (topicTitle?.includes('ACID') || topicTitle?.includes('Isolation Levels')) {
    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-gray-900">
                DBMS ACID Transactional Integrity Pillars
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                Guaranteed database reliability across concurrent workloads and hardware failures.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              letter: "A",
              title: "Atomicity",
              tag: "All or Nothing",
              desc: "Either every operation in the transaction succeeds, or the entire transaction is rolled back. Maintained via Undo Logs / WAL.",
              badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
              tagBg: "bg-emerald-50 text-emerald-800 border-emerald-200"
            },
            {
              letter: "C",
              title: "Consistency",
              tag: "Valid States",
              desc: "Database strictly transitions from one valid state to another, enforcing schemas, primary keys, foreign keys, and integrity triggers.",
              badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
              tagBg: "bg-blue-50 text-blue-800 border-blue-200"
            },
            {
              letter: "I",
              title: "Isolation",
              tag: "Concurrency Shield",
              desc: "Concurrent transactions execute independently without observing intermediate uncommitted states. Governed by 4 Isolation Levels.",
              badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
              tagBg: "bg-amber-50 text-amber-800 border-amber-200"
            },
            {
              letter: "D",
              title: "Durability",
              tag: "Crash Survivability",
              desc: "Once committed, data updates survive power outages and crashes. Guaranteed via Redo Logs flushed to non-volatile storage.",
              badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
              tagBg: "bg-purple-50 text-purple-800 border-purple-200"
            }
          ].map(p => (
            <div key={p.letter} className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2 hover:border-amber-400 transition-all">
              <div className="flex items-center justify-between">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black border ${p.badgeBg}`}>
                  {p.letter}
                </span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.tagBg}`}>
                  {p.tag}
                </span>
              </div>
              <h5 className="font-black text-gray-900 text-sm">{p.title}</h5>
              <p className="text-[11px] text-gray-600 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. OOPS 4 PILLARS INTERACTIVE VISUALIZER (LIGHT THEME)
  if (topicTitle?.includes('4 Pillars') || topicTitle?.includes('OOPs') || topicTitle?.includes('Object Oriented')) {
    const oopsPillars = {
      encapsulation: {
        title: "Encapsulation",
        subtitle: "Data Hiding & Protection",
        color: "bg-amber-100 text-amber-900 border-amber-300",
        desc: "Bundling data (attributes) and methods that manipulate that data into a single unit (class), while restricting direct access using private/protected specifiers.",
        code: `class BankAccount {
  private double balance; // Hidden from outside world

  public void deposit(double amount) {
    if (amount > 0) balance += amount; // Controlled access
  }
}`
      },
      abstraction: {
        title: "Abstraction",
        subtitle: "Hiding Implementation Complexity",
        color: "bg-blue-100 text-blue-900 border-blue-300",
        desc: "Exposing essential user-facing features while concealing underlying implementation details using abstract classes and interfaces.",
        code: `interface PaymentGateway {
  void processPayment(double amount); // User only knows WHAT it does
}
class StripeGateway implements PaymentGateway {
  public void processPayment(double amount) { /* complex crypto */ }
}`
      },
      inheritance: {
        title: "Inheritance",
        subtitle: "Code Reusability & Hierarchy",
        color: "bg-emerald-100 text-emerald-900 border-emerald-300",
        desc: "Mechanism where a child class acquires all properties and behaviors of a parent class (IS-A relationship), enabling clean DRY code reuse.",
        code: `class Vehicle {
  void startEngine() { System.out.println("Engine started"); }
}
class ElectricCar extends Vehicle {
  void chargeBattery() { /* specialized behavior */ }
}`
      },
      polymorphism: {
        title: "Polymorphism",
        subtitle: "Many Forms (Compile-Time vs Run-Time)",
        color: "bg-purple-100 text-purple-900 border-purple-300",
        desc: "Ability of an entity to take multiple forms. Compile-Time: Method Overloading. Run-Time: Method Overriding through dynamic method dispatch.",
        code: `class Shape {
  void draw() { System.out.println("Generic shape"); }
}
class Circle extends Shape {
  @Override void draw() { System.out.println("Drawing Circle ⭕"); }
}`
      }
    };

    const currentPillar = oopsPillars[selectedOopsPillar] || oopsPillars.encapsulation;

    return (
      <div className="rounded-3xl bg-[#F8FAFC] border border-gray-200/90 p-5 sm:p-6 text-gray-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-2xs">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-gray-900">
                The 4 Foundational Pillars of Object-Oriented Programming
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                Click a pillar below to inspect architectural definition and code patterns.
              </p>
            </div>
          </div>

          {/* Switcher */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs flex-wrap">
            {Object.keys(oopsPillars).map(key => (
              <button
                key={key}
                onClick={() => setSelectedOopsPillar(key)}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold capitalize transition-all ${
                  selectedOopsPillar === key
                    ? 'bg-amber-400 text-gray-950 font-black shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-black text-gray-900">{currentPillar.title}</h5>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${currentPillar.color}`}>
                {currentPillar.subtitle}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              {currentPillar.desc}
            </p>
          </div>

          <div className="md:col-span-6 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pb-1.5 border-b border-gray-100 mb-2">
              <span>Code Pattern (Java / C++)</span>
              <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pattern
              </span>
            </div>
            <pre className="text-gray-800 font-mono text-xs leading-relaxed overflow-x-auto bg-gray-50 p-2.5 rounded-xl border border-gray-200">
              {currentPillar.code}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // 8. STANDARD CODE SNIPPET (LIGHT MACOS IDE CARD)
  if (codeSnippet) {
    return (
      <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200/90 shadow-2xs overflow-hidden my-3">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100/90 border-b border-gray-200 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-mono font-bold text-gray-600 ml-2">
              {subjectCode ? `${subjectCode} Architecture & Reference` : 'Architecture & Code Reference'}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-bold text-[11px] transition-colors border border-gray-200 shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-xs text-gray-800 overflow-x-auto leading-relaxed bg-[#F8FAFC]">
          <pre>{codeSnippet}</pre>
        </div>
      </div>
    );
  }

  return null;
}
