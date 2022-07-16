const facbook_form = document.getElementById("facbook_form");
const msg = document.querySelector(".msg");
const output = document.getElementById("output");
const loadding = document.querySelector(".loadding");
const loadding_save = document.querySelector(".loadding_save");

const allData = (e) => {
  let lsData = getItem("facebook");
  let list = "";
  let date = new Date();
  // console.log(lsData)
  if (!lsData || lsData == "") {
    list = `<h2 class="text-center p-2">No post</h2>`;
  }

  if (lsData) {
    lsData.map((item, index) => {
      list += `<li class="my-2  list-group-item px-0">
            <div class="d-flex justify-content-between align-items-center ">
            <div  class="d-flex align-items-center justify-content-start ps-3 ">
            <span class="user_top_img">                
            <img  style="width: 42px;height:42px" src="${item.user_photo}" alt="user" class="border-1 border-dark rounded rounded-circle me-2">
            </span>
                <div class=" my-3 d-flex flex-column justify-content-start text-start">
                 <p class="mb-0 user_name_top">${item.user_name}</p>
                </div>
            </div>
    
              <div class="dropdown dropdown-menu-start pe-2">
                <button class="btn btn-secondary dropdown-toggle btn-group dropstart" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">                    <li><a class="dropdown-item edit"  serial="${index}" href="#"  data-bs-target="#edit_form" data-bs-toggle="modal">Edit</a></li>
                    <li><a class="dropdown-item delete"  serial="${index}" href="#">Delete</a></li>
                </ul>
                </div>
            </div>
           
            <div class="post_img_output">
                <img src="${item.photo}" alt="" class="py-2">
            </div>
         
            
            <div class="lowerfield d-flex justify-content-between p-2">
            <div class=" d-flex justify-content-start">
                <div class="like"><button class="btn btn-outline-white border-0"><svg aria-label="Like" class="_ab6-" color="#000" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg></button></div>
                <div class="comment"><button class="btn btn-outline-white border-0"><svg aria-label="Comment" class="_ab6-" color="#000" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></button></div>
                <div class="share"><button  class="btn btn-outline-white border-0"><svg aria-label="Share Post" class="_ab6-" color="#000" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></button></div>
            </div>
                <div class="share"><button  class="btn btn-outline-white border-0"><svg aria-label="Save" class="_ab6-" color="#000" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg></button></div>
            </div>
            <div class=" comment_section my-2 px-3">
            <p>13,609 likes</p>
            <p>13,609 <span>..more</span></p>
            <p>view all 79 comments</p>
            <p>10 MINUTES AGO</p>
             <div class="d-flex justify-content-between">
             <i class="fa-regular fa-face-smile position-absolute my-2 mx-2"></i>
             <input class="w-75 rounded rounded-5 border px-5" placeholder="Add a comment...">
             <button class="btn btn-white text-primary">post</button>
             </div>
            </div>
            </li>
            `;
    });
  }
  output.innerHTML = list;
};

allData();

// form submit

facbook_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let form_value = new FormData(e.target);
  let form_data = Object.fromEntries(form_value.entries());
  let { photo, user_name, user_photo } = form_data;
  if (!photo || !user_name || !user_photo) {
    msg.innerHTML = setAlert("All fields are required");
  } else {
    loadding.style.display = "block";
    loadding.style.opacity = "1.5";
    e.target.style.opacity = ".5";
    setTimeout(() => {
      loadding.style.display = "none";
      e.target.style.opacity = "1";
      setDataLs("facebook", form_data);
      allData();
      e.target.reset();
    }, 1000);
  }
});

output.onclick = (e) => {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {
    let index = e.target.getAttribute("serial");
    let lsdata_delete = getItem("facebook");
    lsdata_delete.splice(index, 1);
    updataLsData("facebook", lsdata_delete);
    allData();
  }
  if (e.target.classList.contains("edit")) {
    let index = e.target.getAttribute("serial");
    let lsdata_edit = getItem("facebook");
    const poto_edit = document.getElementById("photo");
    const user_name_edit = document.getElementById("user_name");
    const user_photo_edit = document.getElementById("user_photo");
    let { photo, user_name, user_photo } = lsdata_edit[index];

    poto_edit.value = photo;
    user_name_edit.value = user_name;
    user_photo_edit.value = user_photo;
    // console.log(index);
    facbook_edit.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(index);
      let form_value = new FormData(e.target);
      let form_data = Object.fromEntries(form_value.entries());
      let { photo, user_name, user_photo } = form_data;

      if (!photo || !user_name || !user_photo) {
        msg.innerHTML = setAlert("All fields are required");
      } else {
        e.target.style.opacity = ".3";
        loadding_save.style.opacity = "1";
        loadding_save.style.display = "block";
        setTimeout(() => {
          e.target.style.opacity = "1";
          loadding_save.style.display = "none";
          lsdata_edit[index] = {
            photo,
            user_name,
            user_photo,
          };
          updataLsData("facebook", lsdata_edit);
          e.target.reset();
          allData();
        }, 1000);
      }
    });
  }
};
