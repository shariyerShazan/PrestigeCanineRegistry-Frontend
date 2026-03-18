// data/dogsData.ts
import dog1 from "@/assets/home/allDogs/dog1.png"
import dog2 from "@/assets/home/allDogs/dog2.png"
import dog3 from "@/assets/home/allDogs/dog3.png"


import owner from "@/assets/home/allDogs/owner.jpg"
import owner2 from "@/assets/home/allDogs/owner2.jpg"


type Dog = {
  id: string
  name: string
  breed: string
  pcrId: string
  imageUrl: string
  ownerName: string
  ownerAvatar?: string
  verifyType?: "gold" | "blue" | "pending"
}

export const dogsData: Dog[] = [
  {
    id: "1",
    name: "Bella Daisy",
    breed: "Origin: Golden Retriever",
    pcrId: "#PCR-LR-009876",
    imageUrl: dog1,
    ownerName: "Iris Barrows",
    ownerAvatar: owner,
    verifyType: "gold",
  },
  {
    id: "2",
    name: "Charlie",
    breed: "Origin: French Bulldog",
    pcrId: "#PCR-LR-2024-009876",
    imageUrl: dog2,
    ownerName: "Dylan Hodges",
    ownerAvatar: owner,
    verifyType: "blue",
  },
  {
    id: "3",
    name: "Luna Cooper",
    breed: "Origin: German Shepherd",
    pcrId: "#PCR-LR-2024-008452",
    imageUrl: dog3,
    ownerName: "Madonna",
    ownerAvatar: owner2,
    verifyType: "gold",
  },
  {
    id: "4",
    name: "Rocky",
    breed: "Origin: Rottweiler",
    pcrId: "#PCR-LR-2024-003214",
    imageUrl: dog2,
    ownerName: "James Anderson",
    ownerAvatar: owner,
    verifyType: "pending",
  },
  {
    id: "5",
    name: "Milo",
    breed: "Origin: Labrador Retriever",
    pcrId: "#PCR-LR-2023-007891",
    imageUrl: dog3,
    ownerName: "Sophia Turner",
    ownerAvatar: owner2,
    verifyType: "blue",
  },
  {
    id: "6",
    name: "Max",
    breed: "Origin: Siberian Husky",
    pcrId: "#PCR-LR-2023-004567",
    imageUrl: dog1,
    ownerName: "Ethan Brooks",
    ownerAvatar: owner,
    verifyType: "gold",
  },
]
