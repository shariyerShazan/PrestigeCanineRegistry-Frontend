import dog1 from "@/assets/home/allDogs/dog1.png"
import dog2 from "@/assets/home/allDogs/dog2.png"
import dog3 from "@/assets/home/allDogs/dog3.png"


export type UpdateType = "registration" | "certificate" | "health"

export type RecentUpdate = {
  id: string
  type: UpdateType
  dogName: string
  image: string
  pcrId: string
  microchip: string
  submittedAt: string
  status?: "pending" | "approved"
  requester?: string
}


export const recentUpdates: Record<UpdateType, RecentUpdate[]> = {
  registration: [
    {
      id: "r1",
      type: "registration",
      dogName: "Max Thunder",
      image: dog1,
      pcrId: "#PCR-LR-009876",
      microchip: "985112002345678",
      submittedAt: "11/27/2024",
      status: "pending",
    },
  ],

  certificate: [
    {
      id: "c1",
      type: "certificate",
      dogName: "Buddy",
      image: dog2,
      pcrId: "#PCR-LR-009876",
      microchip: "985112002345678",
      submittedAt: "11/27/2024",
      status: "approved",
    },
  ],

  health: [
    {
      id: "h1",
      type: "health",
      dogName: "Charlie",
      image: dog3,
      pcrId: "#PCR-LR-009876",
      microchip: "985112002345678",
      submittedAt: "11/27/2024",
      requester: "Dylan Hodges",
    },

  ],
}
