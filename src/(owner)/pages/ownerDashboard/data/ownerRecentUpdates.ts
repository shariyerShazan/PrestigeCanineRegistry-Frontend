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
    // {
    //   id: "r2",
    //   type: "registration",
    //   dogName: "Rocky",
    //   image: dog2,
    //   pcrId: "#PCR-LR-008732",
    //   microchip: "985112002300111",
    //   submittedAt: "11/26/2024",
    //   status: "pending",
    // },
    // {
    //   id: "r3",
    //   type: "registration",
    //   dogName: "Luna",
    //   image: dog3,
    //   pcrId: "#PCR-LR-007654",
    //   microchip: "985112002309999",
    //   submittedAt: "11/25/2024",
    //   status: "pending",
    // },
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
    // {
    //   id: "c2",
    //   type: "certificate",
    //   dogName: "Charlie",
    //   image: dog1,
    //   pcrId: "#PCR-LR-004321",
    //   microchip: "985112002312312",
    //   submittedAt: "11/26/2024",
    //   status: "approved",
    // },
    // {
    //   id: "c3",
    //   type: "certificate",
    //   dogName: "Milo",
    //   image: dog3,
    //   pcrId: "#PCR-LR-006789",
    //   microchip: "985112002300444",
    //   submittedAt: "11/25/2024",
    //   status: "approved",
    // },
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
    // {
    //   id: "h2",
    //   type: "health",
    //   dogName: "Bella",
    //   image: dog1,
    //   pcrId: "#PCR-LR-005432",
    //   microchip: "985112002399999",
    //   submittedAt: "11/26/2024",
    //   requester: "Sarah Miles",
    // },
    // {
    //   id: "h3",
    //   type: "health",
    //   dogName: "Max",
    //   image: dog2,
    //   pcrId: "#PCR-LR-002222",
    //   microchip: "985112002388888",
    //   submittedAt: "11/25/2024",
    //   requester: "James Parker",
    // },
  ],
}
