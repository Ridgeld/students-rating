import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request) {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);

    const users = [];
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({ uid: doc.id, ...data });
    });

    users.sort((a, b) => b.score - a.score);

    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении данных из Firestore:", error.message);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
    });
  }
}
