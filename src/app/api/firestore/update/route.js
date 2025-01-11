import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    // Получаем тело запроса
    const body = await request.json();
    console.log("Полученные данные:", body);

    const { uid, score, name, group, login } = body;

    if (!uid || score === undefined || !name || !group || !login) {
      console.error("Некорректные данные:", { uid, score, name, group });
      return new Response(JSON.stringify({ error: "Некорректные данные" }), {
        status: 400,
      });
    }

    // Ссылка на документ пользователя
    const userRef = doc(db, "users", uid.toString());
    const userDoc = await getDoc(userRef);

    let existingScore = 0;

    // Проверяем существующие данные
    if (userDoc.exists()) {
      const userData = userDoc.data();
      existingScore = userData.score // Используем существующие баллы, если есть
    }

    // Обновляем баллы, если новые больше
    if (score !== existingScore) {
      await setDoc(
        userRef,
        {
          uid,
          score,
          name,
          group,
          login,
        },
        { merge: true } // Слияние данных
      );

      return new Response(
        JSON.stringify({ message: "Баллы обновлены в Firestore" }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Баллы меньше или равны текущим, обновление не требуется" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при работе с Firestore:", error.message, error.stack);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
    });
  }
}
