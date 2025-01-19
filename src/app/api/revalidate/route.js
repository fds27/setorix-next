import { revalidateTag } from "next/cache";

export async function POST(request) {
  try {
    const payload = await request.json();

    // Лог payload для перевірки
    console.log("Payload received for revalidation:", payload);

    // Перевірка моделі, яка потребує ревалідації
    revalidateTag("home_data");
    console.log("Cache revalidated for tag: home_data");

    return new Response(null, { status: 204 }); // Повертаємо успішну відповідь
  } catch (error) {
    console.error("Error in revalidation:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
