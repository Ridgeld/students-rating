// // // export async function POST(req) {
// // //     // const jwtToken = req.headers.get('authorization');  // Получаем JWT токен из заголовков запроса
// // //     const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjotMSwidWlkIjoxNDI2NzcsImZ1bGxOYW1lIjoi0JzRg9GB0YLQsNGE0LjQvSDQlNCw0L3QuNGN0LvRjCDQpNCw0YDQuNC00L7QstC40YciLCJyb2xlIjoyfSwiaWF0IjoxNzM2MzUyMjM2LCJleHAiOjE3MzYzNTU4MzZ9.D5asjc8YPI60VOXbJ-2NXaPUfWUzcWnApt-NzcdeBiY"
// // //     const body = await req.json();  // Получаем данные из тела запроса
  
// // //     // https://avn.kstu.kg/lms/api/auth/orize.json
// // //     try {
// // //       const response = await fetch('https://avn.kstu.kg/lms/api/personalcard/score.json', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': 'Bearer ' + jwtToken,  // Добавляем JWT токен
// // //           'Content-Type': 'application/json',     // Указываем тип контента
// // //         },
// // //         body: JSON.stringify(body)  // Отправляем данные тела запроса
// // //       });
  
// // //       // Проверяем успешность ответа
// // //       if (!response.ok) {
// // //         throw new Error('Failed to fetch data');
// // //       }
  
// // //       const data = await response.json();
// // //       return new Response(JSON.stringify(data), { status: 200 });  // Возвращаем данные в ответе
// // //     } catch (error) {
// // //       console.error('Error fetching data:', error);
// // //       return new Response(
// // //         JSON.stringify({ message: 'Error fetching data', error: error.message }),
// // //         { status: 500 }
// // //       );
// // //     }
// // //   }
  
// // export async function POST(req) {
// //     const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjotMSwidWlkIjoxNDI2NzcsImZ1bGxOYW1lIjoi0JzRg9GB0YLQsNGE0LjQvSDQlNCw0L3QuNGN0LvRjCDQpNCw0YDQuNC00L7QstC40YciLCJyb2xlIjoyfSwiaWF0IjoxNzM2MzUyMjM2LCJleHAiOjE3MzYzNTU4MzZ9.D5asjc8YPI60VOXbJ-2NXaPUfWUzcWnApt-NzcdeBiY";
  
// //     try {
// //       const body = await req.json(); // Получаем тело запроса
  
// //       // Определяем конечный URL на основе данных из тела или другого параметра
// //       let apiUrl;
// //       if (body.route === 'personalcard') {
// //         apiUrl = 'https://avn.kstu.kg/lms/api/personalcard/score.json';
// //       } else if (body.route === 'auth') {
// //         apiUrl = 'https://avn.kstu.kg/lms/api/auth/orize.json';
// //       } else {
// //         return new Response(JSON.stringify({ message: 'Invalid route' }), { status: 400 });
// //       }
  
// //       // Прокси запрос на выбранный сервер
// //       const response = await fetch(apiUrl, {
// //         method: 'POST',
// //         headers: {
// //         //   'Authorization': 'Bearer ' + jwtToken, // Добавляем JWT токен
// //           'Content-Type': 'application/json',    // Указываем тип контента
// //         },
// //         body: JSON.stringify(body.data), // Передаем только данные, без маршрута
// //       });
  
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch data from ${apiUrl}`);
// //       }
  
// //       const data = await response.json();
// //       return new Response(JSON.stringify(data), { status: 200 }); // Возвращаем ответ
// //     } catch (error) {
// //       console.error('Error:', error.message);
// //       return new Response(
// //         JSON.stringify({ message: 'Error processing request', error: error.message }),
// //         { status: 500 }
// //       );
// //     }
// //   }
// export async function POST(req) {
//     const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjotMSwidWlkIjoxNDI2NzcsImZ1bGxOYW1lIjoi0JzRg9GB0YLQsNGE0LjQvSDQlNCw0L3QuNGN0LvRjCDQpNCw0YDQuNC00L7QstC40YciLCJyb2xlIjoyfSwiaWF0IjoxNzM2MzUyMjM2LCJleHAiOjE3MzYzNTU4MzZ9.D5asjc8YPI60VOXbJ-2NXaPUfWUzcWnApt-NzcdeBiY";
  
//     try {
//       const body = await req.json(); // Получаем тело запроса
  
//       // Определяем конечный URL
//       let apiUrl;
//       if (body.route === 'personalcard') {
//         apiUrl = 'https://avn.kstu.kg/lms/api/personalcard/score.json';
//       } else if (body.route === 'auth') {
//         apiUrl = 'https://avn.kstu.kg/lms/api/auth/orize.json';
//       } else if (body.route === 'enticate') {
//         apiUrl = 'https://avn.kstu.kg/lms/api/auth/enticate.json';
//       } else {
//         return new Response(JSON.stringify({ message: 'Invalid route' }), { status: 400 });
//       }
  
//       // Прокси-запрос на внешний сервер
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//         //   'Authorization': 'Bearer ' + jwtToken, // Добавляем JWT токен
//           'Content-Type': 'application/json',    // Указываем тип контента
//         },
//                             credentials: 'include',
//         body: JSON.stringify(body.data), // Передаем только данные, без маршрута
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data from ${apiUrl}`);
//       }
  
//       // Получаем тело ответа и заголовки
//       const data = await response.json();
//     //   const setCookieHeader = response.headers.get('set-cookie');
//     const setCookieHeader = response.headers.get('set-cookie');

//     if (setCookieHeader) {
//       // Здесь добавляем или меняем домен для cookie
//       const newSetCookieHeader = setCookieHeader.replace(
//         /Domain=[^;]+/,
//         'Domain=avn.kstu.kg' // Указываем нужный домен
//       );

//       // Создаем новый ответ с измененным Set-Cookie
//       const responseWithCookie = new Response(JSON.stringify(data), { status: 200 });
//       responseWithCookie.headers.set('Set-Cookie', newSetCookieHeader);

//       return responseWithCookie;
//     } else {
//       return new Response(JSON.stringify(data), { status: 200 });
//     }
  
//       // Создаем ответ от вашего API
//       const responseFromProxy = new Response(JSON.stringify(data), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       // Устанавливаем cookies в ответе, если они есть
//       if (setCookieHeader) {
//         responseFromProxy.headers.append('Set-Cookie', setCookieHeader);
//       }
  
//       return responseFromProxy;
//     } catch (error) {
//       console.error('Error:', error.message);
//       return new Response(
//         JSON.stringify({ message: 'Error processing request', error: error.message }),
//         { status: 500 }
//       );
//     }
//   }
let savedCookies = '';  // Переменная для хранения кук

function extractToken(cookieHeader) {
    // Обрезаем первые 10 символов, если это "token=logout"
    const cleanedCookieHeader = cookieHeader.substring(10); // Обрезаем "token=logout; "

    // Регулярное выражение для поиска второго токена
    const tokenMatch = cleanedCookieHeader.match(/token=([^;]+)/);

    // Если токен найден, возвращаем его значение
    if (tokenMatch && tokenMatch[1]) {
        return tokenMatch[1];
    } else {
        return null; // Если токен не найден
    }
}

export async function POST(req) {
  const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjotMSwidWlkIjoxNDI2NzcsImZ1bGxOYW1lIjoi0JzRg9GB0YLQsNGE0LjQvSDQlNCw0L3QuNGN0LvRjCDQpNCw0YDQuNC00L7QstC40YciLCJyb2xlIjoyfSwiaWF0IjoxNzM2MzUyMjM2LCJleHAiOjE3MzYzNTU4MzZ9.D5asjc8YPI60VOXbJ-2NXaPUfWUzcWnApt-NzcdeBiY";
  
  try {
    const body = await req.json();  // Получаем тело запроса

    // Определяем конечный URL
    let apiUrl;
    if (body.route === 'personalcard') {
      apiUrl = 'https://avn.kstu.kg/lms/api/personalcard/score.json';
    } else if (body.route === 'auth') {
      apiUrl = 'https://avn.kstu.kg/lms/api/auth/orize.json';
    } else if (body.route === 'enticate') {
      apiUrl = 'https://avn.kstu.kg/lms/api/auth/enticate.json';
    } else {
      return new Response(JSON.stringify({ message: 'Invalid route' }), { status: 400 });
    }

    // Прокси-запрос на внешний сервер с передачей кук в заголовке
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Указываем тип контента
        'Cookie': `token=${savedCookies}`,  // Передаем сохраненные куки
      },
      credentials: 'include', // Чтобы браузер также отправлял куки
      body: JSON.stringify(body.data), // Передаем только данные
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${apiUrl}`);
    }

    const data = await response.json();
    const setCookieHeader = response.headers.get('set-cookie');  // Получаем новый Set-Cookie

    // Если в ответе есть Set-Cookie, сохраняем его
    if (setCookieHeader) {
        savedCookies = extractToken(setCookieHeader);
        console.log(savedCookies);  // Сохраняем куки для последующих запросов
    }

    // Создаем новый ответ с данными
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ message: 'Error processing request', error: error.message }),
      { status: 500 }
    );
  }
}
