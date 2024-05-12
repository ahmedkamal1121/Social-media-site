setUI();

function register() {
  let name = document.getElementById("register-name").value;
  let Username = document.getElementById("register-Username").value;
  let password = document.getElementById("register-password").value;
  let userImg = document.getElementById("user-img").files[0];

  const url = "https://tarmeezacademy.com/api/v1/register";
  // const prams ={
  //   "username" : Username,
  //   "password" : password,
  //   "name ":name
  // }
  let formData = new FormData();
  formData.append("username", Username);
  formData.append("password", password);
  formData.append("image", userImg);
  formData.append("name", name);
  toogelloder();
  axios
    .post(url, formData)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const model = document.getElementById("reg-m");
      const instans = bootstrap.Modal.getInstance(model);
      instans.hide();
      setUI();

      Alertmm("نورتنا يا مميز ");
    })
    .catch((erorr) => {
      Alertmm(erorr.response.data.message, "danger");
    })
    .finally(() => {
      toogelloder(false);
    });
}

function loginCliked() {
  let Username = document.getElementById("Username").value;
  let password = document.getElementById("password").value;

  const url = "https://tarmeezacademy.com/api/v1/login";
  const prams = {
    username: Username,
    password: password,
  };
  toogelloder();
  axios
    .post(url, prams)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const model = document.getElementById("log-in-m");
      const instans = bootstrap.Modal.getInstance(model);
      instans.hide();
      setUI();

      Alertmm("login :)", "success");
    })
    .catch((erorr) => {
      Alertmm(erorr.response.data.message, "danger");
    })
    .finally(() => {
      toogelloder(false);
    });
}

function setUI() {
  const userobj = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  let addBtn = document.getElementById("add-btn-1");
  let loginn = document.getElementById("login-div");
  let logoutt = document.getElementById("logout-div");
  let profileImg = document.getElementById("profile-img");
  let profilename = document.getElementById("profile-name");

  if (token == null) {
    if (addBtn != null) {
      addBtn.style.setProperty("display", "none", "important");
    }

    loginn.style.setProperty("display", "flex", "important");
    logoutt.style.setProperty("display", "none", "important");
  } else {
    if (addBtn != null) {
      addBtn.style.setProperty("display", "block", "important");
    }

    profilename.innerHTML = JSON.parse(userobj).username;
    profileImg.src = JSON.parse(userobj).profile_image;

    loginn.style.setProperty("display", "none", "important");
    logoutt.style.setProperty("display", "flex", "important");
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUI();
  Alertmm("  logout :( ", "danger");
}

function Alertmm(sms, type = "success") {
  const alertPlaceholder = document.getElementById("newalert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  appendAlert(sms, type);
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
    toogelloder(false);
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

function showmyprofile() {
  let user = JSON.parse(localStorage.getItem("user"));
  window.location = `profile.html?userid=${user.id}`;
}

function toogelloder(show = true) {
  if (show) {
    document.getElementById("loder").style.visibility = "visible";
  } else {
    document.getElementById("loder").style.visibility = "hidden";
  }
}
