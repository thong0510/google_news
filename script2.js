//Khai bao bien hien tai khi mo trang no co class active
let currentSideMenu = "top-stories";
const API_KEY = "ca657305aab940bf81ecae8b86b421bd";
let newList = [];
//khai bao object cac thong so trong url, bao gom country, tim kiem, category, apikey
let urlOption = {
  country: "us",
  category: "",
  q: "",
};

//viet ham lay url chung
const getURL = (urlOption) => {
  let url = Object.keys(urlOption).reduce((url, option) => {
    if (urlOption[option]) {
      url += `${option}=${urlOption[option]}&`;
    }
    return url;
  }, "https://newsapi.org/v2/top-headlines?");
  url += `apiKey=${API_KEY}`;
  return url;
};
// console.log(getURL(urlOption));

const laydulieu = async () => {
  const res = await fetch(getURL(urlOption));
  const data = await res.json();
  // console.log(data);
  let newList = data.articles;
  // console.log(newList);
  render(newList);
};
laydulieu();

const render = (newList) => {
  document.getElementById("new-list").innerHTML = newList.map((moiphantu) => {
    return `<li class="media info">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${moiphantu.title}</h5>
      <p>
        ${moiphantu.content}
      </p>
      <span class="badge badge-info">${moiphantu.source.name}</span>
       <div>
    <a href="${moiphantu.url}" target="_blank">View source</a>
    </div>
    </div>
    <img src="${moiphantu.urlToImage}" class="ml-3" alt="..." />
  </li>`;
  });
};

//viet 1 ham add class
const putActiveClass = (category) => {
  //remove active link cu
  document.getElementById(currentSideMenu).classList.remove("active");
  //add active vao link moi
  document.getElementById(category).classList.add("active");
  //in ra tieu de khi click vao tung link side menu
  document.getElementById("category-title").innerHTML = category
    .split("-")
    .join(" ")
    .toUpperCase();
  /*
    .split(): bo di cai gi do
    .join() : them cai gi do
    .toUpperCase(): chuyen sang chu hoa
    */

  //update bien hien tai la link moi
  currentSideMenu = category;
};
//ban dau top stories co active
putActiveClass(currentSideMenu);

//khi click chay ham nay.
const handleClickMenu = async (category) => {
  document.getElementById("new-list").innerHTML = "Loading...";

  //goi ham add class vao
  putActiveClass(category);

  if (category === "top-stories") {
    urlOption.category = "";
  } else {
    urlOption.category = category;
  }
  laydulieu();
};

const handleSearch = async () => {
  document.getElementById("new-list").innerHTML = "Loading...";
  let searchInfo = document.getElementById("form-search").value;
  urlOption.q = searchInfo;
  laydulieu();
};
