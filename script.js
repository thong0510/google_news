let currentSideMenu = "top-stories";
const API_KEY = "ca657305aab940bf81ecae8b86b421bd";
// khai bao 1 list cac danh sach tin tuc. ban dau no la rong va khai bao let vi thay doi
let newList = [];

const getArticle = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  newList = data.articles;
  //khi lay du lieu goi ham render list du lieu vao
  renderArticles(newList);
  // console.log(newList);
};
getArticle();

const renderArticles = (newList) => {
  let newListHTML = newList.map((a) => {
    //newList la mot mang, chua nhieu object, voi moi phan tu trong mang(a) thi lay a.title ...
    return `<li class="media">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${a.title}</h5>
      <p>
        ${a.content}
      </p>
      <div>
      <a href="${a.url}" target="_blank">View link converage</a>
      </div>
    </div>
    <img src="${a.urlToImage}" class="ml-3" alt="..." />
  </li>`;
  });
  document.getElementById("new-list").innerHTML = newListHTML;
};

const putActiveClass = (category) => {
  document.getElementById(currentSideMenu).classList.remove("active");
  document.getElementById(category).classList.add("active");
  document.getElementById("category-title").innerHTML = category
    .split("-")
    .join(" ")
    .toUpperCase();
  currentSideMenu = category;
};

putActiveClass(currentSideMenu);

const handleClickSideMenu = async (category) => {
  putActiveClass(category);
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  newList = data.articles;
  //khi lay du lieu goi ham render list du lieu vao
  renderArticles(newList);
};
