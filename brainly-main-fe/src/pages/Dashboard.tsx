import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateComponentModal } from "../components/CreateComponentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
  <div className="flex">
    <Sidebar />
  <div className="p-4 ml-72 w-screen min-h-screen bg-gray-100 border-2">
    <div>
      <CreateComponentModal open={modalOpen} onClose={() => {setModalOpen(false)}}/>
    </div>
    <div className="flex justify-end gap-4">
      <Button onClick={() => {setModalOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}/>
    </div>
    <div className="flex gap-4 mt-2">
      <Card type="twitter" link="https://x.com/Prajan_S8/status/1845633190515364073" title="First tweet"/>
      <Card type="youtube" link="https://youtu.be/JAgHUDhaTU0?si=phl1uMEttMx_S6bj" title="A podcast" /> 
    </div>
  </div>
  </div>
  ) 
}

