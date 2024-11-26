let Main_container_book_row = document.querySelector(
  ".Main_container_book_row"
);

document.querySelector(".create-book-btn").addEventListener("click", () => {
  document
    .querySelector(".Main_container_book_modal")
    .classList.add("Main_container_book_modal_active");
  document
    .querySelector(".Main_container_book_modal_inside")
    .classList.add("Main_container_book_modal_inside_active");
});

document
  .querySelector(".Main_container_book_modal_header_close")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_inside")
      .classList.remove("Main_container_book_modal_inside_active");
  });
document
  .querySelector(".Main_container_book_modal_btn_close")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_inside")
      .classList.remove("Main_container_book_modal_inside_active");
  });

document
  .querySelector(".Main_container_book_modal_header_close_edit")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal_edit")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_header_close_edit")
      .classList.remove("Main_container_book_modal_inside_active");
  });
document
  .querySelector(".Main_container_book_modal_btn_close_edit")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal_edit")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_btn_close_edit")
      .classList.remove("Main_container_book_modal_inside_active");
  });

  document
  .querySelector(".Main_container_book_modal_inside")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let isbnCode = e.target.isbn.value.trim();
    let isDone = false;

    if (!isbnCode) {
      let notif = document.querySelector(".Main_container_notification");
      notif.style.display = "flex";
      document.querySelector(".Main_container_notification_title p").innerHTML =
        "Iltimos ISBN kodini kiriting!";
      document.querySelector(
        ".Main_container_notification_title h4"
      ).innerHTML = "Xatolik!";
      notif.style.backgroundcolor = "red";
      setTimeout(() => {
        notif.style.display = "none";
      }, 3500);
      return;
    }

    let notif = document.querySelector(".Main_container_notification");
    notif.style.display = "flex";
    document.querySelector(".Main_container_notification_title p").innerHTML =
      "Kitob kutubxonangizga qo'shildi!";
    document.querySelector(".Main_container_notification_title h4").innerHTML =
      "Xabar!";
    notif.style.backgroundcolor = "#52C41A";
    setTimeout(() => {
      notif.style.display = "none";
    }, 5000);
    try {
      let data = await fetch("http://localhost:3000/Booklist")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data.filter((item) => item.isbn == isbnCode);
        });

      if (!data.length) {
        showNotification("Kitob topilmadi!", "Xatolik!", "#FF0000");
        return;
      }

      async function FetchData (){ await fetch("http://localhost:3000/myBooklist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data[0]),
        }).then(() => {
          data.map((item) => {
            Main_container_book_row.innerHTML += `<div key="${
              item.id
            }" class="Main_container_book_row_col">
                      <div class="Main_container_book_row_col_main">
                        <h2>${item.bookTitle}</h2>
                        <p>
                          Cover:
                          <a href="${item.cover}">
                            ${item.cover}
                          </a>
                        </p>
                        <p>Pages: ${item.pages}</p>
                        <p>Published: ${item.published}</p>
                        <p>Isbn: ${item.isbn}</p>
                        <div class="Main_container_book_row_col_main_position">
                          <p>${item.author} / ${item.published}</p>
                          <span style="background-color:${
                            item.position == "Reading"
                              ? "#FFEC43"
                              : item.position == "Finished"
                              ? "#00FF29"
                              : item.position == "New"
                              ? "#FF0000"
                              : "gray"
                          }">${item.position}</span>
                        </div>
                      </div>
                      <div class="Main_container_book_row_col_options">
                        <button onClick="Delete(${
                          item.id
                        })" class="Main_container_book_row_col_options_del">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button onClick="EditBook (${
                          item.id
                        })" class="Main_container_book_row_col_options_edit">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 12L13.3332 12.7293C12.9796 13.116 12.5001 13.3333 12.0001 13.3333C11.5001 13.3333 11.0205 13.116 10.6669 12.7293C10.3128 12.3434 9.83332 12.1267 9.33345 12.1267C8.83359 12.1267 8.35409 12.3434 7.99998 12.7293M2 13.3333H3.11636C3.44248 13.3333 3.60554 13.3333 3.75899 13.2964C3.89504 13.2638 4.0251 13.2099 4.1444 13.1368C4.27895 13.0543 4.39425 12.939 4.62486 12.7084L13 4.33328C13.5523 3.781 13.5523 2.88557 13 2.33328C12.4477 1.781 11.5523 1.781 11 2.33328L2.62484 10.7084C2.39424 10.939 2.27894 11.0543 2.19648 11.1889C2.12338 11.3082 2.0695 11.4383 2.03684 11.5743C2 11.7278 2 11.8908 2 12.2169V13.3333Z" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                      </div>
                    </div>`;
          });
          showNotification("Kitob kutubxonangizga qo'shildi!", "Xabar!", "#52C41A");
        });
      }
      if(!isDone){
        showNotification("Kitob kutubxonangizga qo'shildi!", "Xabar!", "#52C41A");
        isDone =true;
        setTimeout(() =>FetchData(), 2000)
      }
    } catch (error) {
      console.log(error);
    }
  });

window.addEventListener("DOMContentLoaded", async () => {
  let data = await fetch("http://localhost:3000/myBooklist").then((res) => {
    return res.json();
  });
  data.map((item) => {
    Main_container_book_row.innerHTML += `<div key="${
      item.id
    }" class="Main_container_book_row_col">
            <div class="Main_container_book_row_col_main">
              <h2>${item.bookTitle}</h2>
              <p>
                Cover:
                <a href="${item.cover}">
                  ${item.cover}
                </a>
              </p>
              <p>Pages: ${item.pages}</p>
              <p>Published: ${item.published}</p>
              <p>Isbn: ${item.isbn}</p>
              <div class="Main_container_book_row_col_main_position">
                <p>${item.author} / ${item.published}</p>
                <span style="background-color:${
                  item.position == "Reading"
                    ? "#FFEC43"
                    : item.position == "Finished"
                    ? "#00FF29"
                    : item.position == "New"
                    ? "#FF0000"
                    : "gray"
                }">${item.position}</span>
              </div>
            </div>
            <div class="Main_container_book_row_col_options">
              <button onClick="Delete(${
                item.id
              })" class="Main_container_book_row_col_options_del">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </button>
              <button onClick="EditBook (${
                item.id
              })" class="Main_container_book_row_col_options_edit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 12L13.3332 12.7293C12.9796 13.116 12.5001 13.3333 12.0001 13.3333C11.5001 13.3333 11.0205 13.116 10.6669 12.7293C10.3128 12.3434 9.83332 12.1267 9.33345 12.1267C8.83359 12.1267 8.35409 12.3434 7.99998 12.7293M2 13.3333H3.11636C3.44248 13.3333 3.60554 13.3333 3.75899 13.2964C3.89504 13.2638 4.0251 13.2099 4.1444 13.1368C4.27895 13.0543 4.39425 12.939 4.62486 12.7084L13 4.33328C13.5523 3.781 13.5523 2.88557 13 2.33328C12.4477 1.781 11.5523 1.781 11 2.33328L2.62484 10.7084C2.39424 10.939 2.27894 11.0543 2.19648 11.1889C2.12338 11.3082 2.0695 11.4383 2.03684 11.5743C2 11.7278 2 11.8908 2 12.2169V13.3333Z" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </button>
            </div>
          </div>`;
  });
});
async function Delete(id) {
  let isDone = false;
  try {
    async function FetchData(){
      const response = await fetch(`http://localhost:3000/myBooklist/${id}`, {
        method: "Delete",
      });
      if (!response.ok) throw new Error("Failed to delete the book.");
      document.querySelector(`[key="${id}"]`).remove();
    }
    if(!isDone){
      showNotification("Kitob kutubxonangizdan o'chirildi!", "Xabar!", "#52C41A")
      isDone =true;
      setTimeout(() =>FetchData(), 2000)
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification(
      "Kitob o'chirishda xatolik yuz berdi!", "Xabar!", "#FF4D4F"
    );
  }
}
let idBook;
async function EditBook(id) {
  document
    .querySelector(".Main_container_book_modal_edit")
    .classList.add("Main_container_book_modal_active");
  document
    .querySelector(".Main_container_book_modal_inside_edit")
    .classList.add("Main_container_book_modal_inside_active");
  idBook = id;
}

document.querySelector(".Main_container_book_modal_inside_edit").addEventListener("submit", async (e) => {
    e.preventDefault();

    let isbn_edit = e.target.position_edit.value;
    let isDone = false;

    try {
      const response = await fetch(`http://localhost:3000/myBooklist/${idBook}`);
      if (!response.ok)
        throw new Error("Failed to fetch the existing book data.");
      const existingData = await response.json();

      async function FetchData(){
        await fetch(`http://localhost:3000/myBooklist/${idBook}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...existingData,
            position: isbn_edit,
          }),
        });
      }
      if(!isDone){
        showNotification("Kitob holati o'zgartirildi!", "Xabar!", "#6200EE");
        isDone =true;
        setTimeout(() =>FetchData(), 3000)
      }
    } catch (error) {
      console.error("Error:", error);
    }
});

function showNotification(message, title, color) {
  let notif = document.querySelector(".Main_container_notification_inside");
  let notifContainer = document.querySelector(".Main_container_notification");
  notifContainer.style.display = "flex";
  document.querySelector(".Main_container_notification_title p").innerHTML = message;
  document.querySelector(".Main_container_notification_title h4").innerHTML = title;
  notif.style.backgroundColor = color;
  setTimeout(() => {
    notifContainer.style.display = "none";
  }, 2000);
}

let search = document.querySelector("#search").addEventListener("keyup", async (e) => {
  let inputValue = e.target.value.toLowerCase();
  try {
    await fetch("http://localhost:3000/myBooklist").then((res) => {
      return res.json();

    }).then((data) => {
      let newData = data.map((item) => item.bookTitle.toLowerCase().includes(inputValue));
      document.querySelector(".Main_container_book_row").innerHTML = "";
      newData.map((item) =>{
        document.querySelector(".Main_container_book_row").innerHTML += `<div key="${
          item.id}" class="Main_container_book_row_col">
                  <div class="Main_container_book_row_col_main">
                    <h2>${item.bookTitle}</h2>
                    <p>
                      Cover:
                      <a href="${item.cover}">
                        ${item.cover}
                      </a>
                    </p>
                    <p>Pages: ${item.pages}</p>
                    <p>Published: ${item.published}</p>
                    <p>Isbn: ${item.isbn}</p>
                    <div class="Main_container_book_row_col_main_position">
                      <p>${item.author} / ${item.published}</p>
                      <span style="background-color:${
                        item.position == "Reading"
                          ? "#FFEC43"
                          : item.position == "Finished"
                          ? "#00FF29"
                          : item.position == "New"
                          ? "#FF0000"
                          : "gray"
                      }">${item.position}</span>
                    </div>
                  </div>
                  <div class="Main_container_book_row_col_options">
                    <button onClick="Delete(${
                      item.id
                    })" class="Main_container_book_row_col_options_del">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button onClick="EditBook (${
                      item.id
                    })" class="Main_container_book_row_col_options_edit">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 12L13.3332 12.7293C12.9796 13.116 12.5001 13.3333 12.0001 13.3333C11.5001 13.3333 11.0205 13.116 10.6669 12.7293C10.3128 12.3434 9.83332 12.1267 9.33345 12.1267C8.83359 12.1267 8.35409 12.3434 7.99998 12.7293M2 13.3333H3.11636C3.44248 13.3333 3.60554 13.3333 3.75899 13.2964C3.89504 13.2638 4.0251 13.2099 4.1444 13.1368C4.27895 13.0543 4.39425 12.939 4.62486 12.7084L13 4.33328C13.5523 3.781 13.5523 2.88557 13 2.33328C12.4477 1.781 11.5523 1.781 11 2.33328L2.62484 10.7084C2.39424 10.939 2.27894 11.0543 2.19648 11.1889C2.12338 11.3082 2.0695 11.4383 2.03684 11.5743C2 11.7278 2 11.8908 2 12.2169V13.3333Z" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                  </div>
                </div>`;
      })
    })
  } catch (error) {
    console.log(error);
  }
})

