let currentPage = 1;
let lastPage = 1;
// ===========infeent scrolll
window.addEventListener("scroll", function () {
  const endPage =
    window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  if (endPage && currentPage < lastPage) {
    currentPage = currentPage + 1;
    getpots(false, currentPage);
  }
});
// ===========//infeent scrolll
getpots();
function getpots(reload = true, page = 1) {
  let alldata = [];
  toogelloder();
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts?limit=3&page=${page}`)
    .then(function (response) {
      lastPage = response.data.meta.last_page;

      if (reload) {
        document.querySelector(".posts").innerHTML = ``;
      }
      alldata = response.data.data;

      for (var i = 0; i < alldata.length; i++) {
        let user = JSON.parse(localStorage.getItem("user"));
        let isMY = user != null && alldata[i].author.id == user.id;
        let btncont = ``;

        if (isMY) {
          btncont = `
         <button style="float: right;" type="button" class="btn btn-outline-secondary" onclick="editpost('${encodeURIComponent(
           JSON.stringify(alldata[i])
         )}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                 <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
              </svg>
         </button>
         <button style="float: right;  margin-right: 5px;" type="button" class="btn btn-outline-danger" onclick="deletepost('${encodeURIComponent(
           JSON.stringify(alldata[i])
         )}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
               </svg>
         </button>
        `;
        }

        let posttit = "";

        if (alldata[i].title != null) {
          posttit = alldata[i].title;
        }

        document.querySelector(".posts").innerHTML += `
    
    <div class="post shadow my-3" ">
                    <div class="card">
                        <div class="card-header">
                        <span onclick="movetoprofile(${alldata[i].author.id})" style="cursor:pointer;"> 
                            <img class="rounded-circle" src="${alldata[i].author.profile_image}" alt="img" style="width: 40px; height: 40px;">
                            <span>@${alldata[i].author.name}</span>
                        </span>  
                             ${btncont}
                        </div>
                        <div class="card-body" onclick="showpost(${alldata[i].id})" >
                            <img src="${alldata[i].image}" style="width: 100%; height: 400px;" alt="img">
                            <span>${alldata[i].created_at}</span>
                          <h5 class="card-title">${posttit}</h5>
                          <p class="card-text">${alldata[i].body}</p>
                          <hr>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                          </svg>
                          <span>(${alldata[i].comments_count}) Coments</span>
                        </div>
                    </div>
                </div>`;
      }
    })
    .catch((erorr) => {
      Alertmm(erorr.response.data.message, "danger");
    })
    .finally(() => {
      toogelloder(false);
    });
}

function createPost() {
  let body = document.getElementById("body-post").value;
  let title = document.getElementById("title-post").value;
  let token = localStorage.getItem("token");
  let img = document.getElementById("img-post").files[0];

  let postId = document.getElementById("post-id").value;
  let isCreat = postId == null || postId == "";

  let url = ``;

  let formData = new FormData();
  formData.append("body", body);
  formData.append("title", title);
  formData.append("image", img);

  if (isCreat) {
    url = "https://tarmeezacademy.com/api/v1/posts";
    toogelloder();
    axios
      .post(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const model = document.getElementById("add-m");
        const instans = bootstrap.Modal.getInstance(model);
        instans.hide();
        setUI();

        Alertmm("post created ...!", "success");
        getpots();
      })
      .catch((erorr) => {
        Alertmm(erorr.response.data.message, "danger");
      })
      .finally(() => {
        toogelloder(false);
      });
  } else {
    formData.append("_method", "put");
    url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
    toogelloder();
    axios
      .post(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const model = document.getElementById("add-m");
        const instans = bootstrap.Modal.getInstance(model);
        instans.hide();
        setUI();

        Alertmm("post created ...!", "success");
        getpots();
      })
      .catch((erorr) => {
        Alertmm(erorr.response.data.message, "danger");
      })
      .finally(() => {
        toogelloder(false);
      });
  }
}

function showpost(id) {
  window.location = `detlies.html?postid=${id}`;
}

function editpost(postobj) {
  let post = JSON.parse(decodeURIComponent(postobj));
  document.getElementById("btn-model").innerHTML = "update";
  document.getElementById("post-id").value = post.id;
  document.getElementById("title-model").innerHTML = "Edit post";
  document.getElementById("title-post").value = post.title;
  document.getElementById("body-post").value = post.body;
  let postmodel = new bootstrap.Modal(document.getElementById("add-m"), {});
  postmodel.toggle();
}

function addbtnclick() {
  document.getElementById("btn-model").innerHTML = "Create";
  document.getElementById("post-id").value = "";
  document.getElementById("title-model").innerHTML = "Creat NEW Post";
  document.getElementById("title-post").value = "";
  document.getElementById("body-post").value = "";
  let postmodel = new bootstrap.Modal(document.getElementById("add-m"), {});
  postmodel.toggle();
}

function deletepost(postobj) {
  let id = JSON.parse(decodeURIComponent(postobj)).id;
  document.getElementById("hedinp").value = id;

  let postmodel = new bootstrap.Modal(document.getElementById("delete"), {});
  postmodel.toggle();
}

function deletePost() {
  let token = localStorage.getItem("token");
  let id = document.getElementById("hedinp").value;

  url = `https://tarmeezacademy.com/api/v1/posts/${id}`;
  toogelloder();
  axios
    .delete(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const model = document.getElementById("delete");
      const instans = bootstrap.Modal.getInstance(model);
      instans.hide();
      setUI();
      Alertmm("Deleted successfully", "success");
      getpots();
    })
    .catch((erorr) => {
      Alertmm(erorr.response.data.message, "danger");
    })
    .finally(() => {
      toogelloder(false);
    });
}

function movetoprofile(id) {
  window.location = `profile.html?userid=${id}`;
}
