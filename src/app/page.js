import { getAgents } from '@/actions/getAgents';
import Sidebar from '@/components/ui/Sidebar';
import GraphCanvas from '@/components/canvas/GraphCanvas';
import ConfigurationPanel from '@/components/ui/ConfigurationPanel';
import ExportToolbar from '@/components/ui/ExportToolbar';
import ChatPanel from '@/components/ui/ChatPanel';
import MobileLayoutHandler from '@/components/ui/MobileLayoutHandler';

export default async function Home() {
  const agents = await getAgents();

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[var(--background)] relative">
      <MobileLayoutHandler />
      <Sidebar agents={agents} />
      <GraphCanvas />
      <ExportToolbar />
      <ConfigurationPanel />
      <ChatPanel />
    </main>
  );
}
