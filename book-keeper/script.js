const modal = document.getElementById("modal")
const modalShow = document.getElementById("show-modal")
const modalClose = document.getElementById("close-modal")
const bookmarkForm = document.getElementById("bookmark-form")
const websiteNameEl = document.getElementById("website-name")
const websiteUrlEl = document.getElementById("website-url")
const bookmarksContainer = document.getElementById("bookmarks-container")

let bookmarks = []
// Show Modal, Focus on Input
function toggleModal() {
  modal.classList.add("show-modal")
  websiteNameEl.focus()
}

// Modal Event Listeners
modalShow.addEventListener("click", toggleModal)
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"))
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
)

// Build Bookmarks DOM
function buildBookmarks() {
  // Remove all bookmarks elements
  bookmarksContainer.textContent = ""
  // Build Items
  bookmarks.forEach((bookmark) => {
    // <div class="item">
    //     <i class="fas fa-times" id="delete-bookmark" title='Delete Bookmark'></i>
    //     <div class="name">
    //         <img src="https://s2.googleusercontent.com/s2/favicons?domain=www.ahamid.me" alt="Favicon">
    //         <a href="https://ahamid.me" target="_blank">Ahamid</a>
    //     </div>
    // </div>
    const { name, url } = bookmark
    // Item
    const item = document.createElement("div")
    item.classList.add("item")
    // Close Icon
    const closeIcon = document.createElement("i")
    closeIcon.classList.add("fas", "fa-times")
    closeIcon.setAttribute("title", "Delete Bookmark")
    closeIcon.setAttribute("onClick", `deleteBookmark('${url}')`)
    // Favicon / Link Container
    const linkInfo = document.createElement("div")
    linkInfo.classList.add("name")
    // Favicon
    const favicon = document.createElement("img")
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    )
    favicon.setAttribute("alt", `Favicon`)
    // Link
    const link = document.createElement("a")
    link.setAttribute("href", `${url}`)
    link.setAttribute("target", "_blank")
    link.textContent = name

    // Append to bookmarks container
    linkInfo.append(favicon, link)
    item.append(closeIcon, linkInfo)
    bookmarksContainer.appendChild(item)
  })
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localstorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
  } else {
    // Create bookmarks array in localstorage
    bookmarks = [{ name: "Ahamid", url: "https://ahamid.me" }]
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }
  buildBookmarks()
}

// Delete Bookmark
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1)
    }
  })
  // Update bookmarks array in localstorage, re-populate DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  fetchBookmarks()
}

// Handle data from Form
function storeBookmark(e) {
  e.preventDefault()
  const nameValue = websiteNameEl.value
  let urlValue = websiteUrlEl.value
  const bookmark = {
    name: nameValue,
    url: urlValue,
  }
  bookmarks.push(bookmark)
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  fetchBookmarks()
  bookmarkForm.reset()
  websiteNameEl.focus()
}

// Event Listeners
bookmarkForm.addEventListener("submit", storeBookmark)

// On Load, fetch Bookmarks
fetchBookmarks()
