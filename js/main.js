// localStorage.clear()


var siteNameInput = document.getElementById("site-name");
var siteUrlInput = document.getElementById("site-url");
var submitButton = document.getElementById("submit-btn");
var tableBookmarks = document.getElementById("table-bookmarks");
// var modalContainer = document.getElementById("mod-container");
var isSiteNameValid;
var isSiteUrlValid;
var bookmarkList = [];


if (localStorage.getItem("bookmarkList").length != 0) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"))
  displayTable()
}

function validateSiteName() {
  var nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}\b$/gm;
  var siteName = siteNameInput.value;
  isSiteNameValid = nameRegex.test(siteName);

  if (siteName) {
    if (isSiteNameValid) {
      siteNameInput.classList.add("is-valid")
      siteNameInput.classList.remove("is-invalid")
    } else {
      siteNameInput.classList.add("is-invalid")
      siteNameInput.classList.remove("is-valid")
    }
  } else {
    siteNameInput.classList.remove("is-valid", "is-invalid");
  }
  return isSiteNameValid;
}

function validateSiteUrl() {
  var urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g;
  var siteUrl = siteUrlInput.value;
  isSiteUrlValid = urlRegex.test(siteUrl);

  if (siteUrl) {
    if (isSiteUrlValid) {
      siteUrlInput.classList.add("is-valid")
      siteUrlInput.classList.remove("is-invalid")
    } else {
      siteUrlInput.classList.add("is-invalid")
      siteUrlInput.classList.remove("is-valid")
    }
  } else {
    // siteNameInput.classList.remove("is-valid", "is-invalid");
    siteUrlInput.classList.remove("is-valid", "is-invalid");
  }
  return isSiteUrlValid;
}

function addUrl() {

  if (isSiteNameValid && isSiteUrlValid) {
    // submitButton.setAttribute("data-bs-toggle", "");
    // submitButton.setAttribute("data-bs-target", "");
    document.getElementById("modal").classList.replace("d-flex", "d-none");
    var bookmark = {
      name: "",
      url: ""
    }
    bookmark.name = siteNameInput.value;
    bookmark.url = siteUrlInput.value;
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList))
    console.log(bookmarkList);
    displayTable()
    clearInput()

  } else {
    // submitButton.setAttribute("data-bs-toggle", "modal")
    // submitButton.setAttribute("data-bs-target", "#errorModal")
    document.getElementById("modal").classList.replace("d-none", "d-flex");

  }

}

function displayTable() {
  tableBookmarks.innerHTML = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    tableBookmarks.innerHTML += `<tr>
    <td>${i}</td>
    <td>${bookmarkList[i].name}</td>
    <td>
      <button class="btn btn-success">
      <a href='${urlCheck(bookmarkList[i].url)}' target="_blank" class="text-decoration-none text-white">
        <i class="fa-solid fa-eye"></i> Visit
      </a>
      </button>
    </td>
    <td>
      <button class="btn btn-danger" onClick="deleteBookmark(${i})">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </td>
  </tr>`
  }

}

function urlCheck(url) {
  if (url.indexOf("https://") == 0) {
    return url;
  } else if (url.indexOf("http://") == 0) {
    return url;
  } else {
    return "https://" + url
  }
}

function clearInput() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
  isSiteNameValid = false;
  isSiteUrlValid = false;

}


function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList))
  displayTable();
}


function closeModal() {
  document.getElementById("modal").classList.replace("d-flex", "d-none");
}