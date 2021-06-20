//declare variable when the firt open web, menu sidebar have class active
let currentSideMenu = "top-stories";
//declare API_KEY get from google news
const API_KEY = "ca657305aab940bf81ecae8b86b421bd";
//declare list news of google, when start this empty
let newList = [];
//declare object include parameters of url: country, category, search
let urlOption = {
  country: "us",
  category: "",
  q: "",
};

// function sum values of object if this have

const sumValueOfObject = (total, currentValue) => {
  if (urlOption[currentValue]) {
    total += `${currentValue}=${urlOption[currentValue]}&`;
  }
  return total;
};

//function get URL gerenaral

const getURL = (urlOption) => {
  // khai bao 1 arr dc tra ve tu object. ta dung Object.keys()
  let arr = Object.keys(urlOption);
  // khai bao url tu mang tra ve 1 gia tri string. call function vao.
  let url = arr.reduce(
    sumValueOfObject,
    "https://newsapi.org/v2/top-headlines?"
    // day la gia tri khoi tao.
  );
  url += `apiKey=${API_KEY}`;
  return url;
};
// console.log(getURL(urlOption));

/*
- CACH 2 : VIET TAT DUNG ARROW FUNCTION
const getURL = (urlOption) => {
  let url = Object.keys(urlOption).reduce((acc, currentValue, index, arr ) => {
    acc += `${currentValue}=${urlOption[currentValue]}&`;
  }, "https://newsapi.org/v2/top-headlines?");
  url += `apiKey=${API_KEY}`;
  return url;
}
*/

const laydulieu = async () => {
  const res = await fetch(getURL(urlOption));
  const data = await res.json();
  // console.log(data);
  let newList = data.articles;
  // console.log(newList);
  render(newList);
};

// khi web vua mo, da lay du lieu roi, nen phai goi ham nay de chay luon tu dau.

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
  try {
    document.getElementById("new-list").innerHTML = "Loading...";

    //goi ham add class vao
    putActiveClass(category);

    if (category === "top-stories") {
      urlOption.category = "";
    } else {
      urlOption.category = category;
    }
    laydulieu();
  } catch (error) {
    alert(error);
  }
};

const handleSearch = async () => {
  document.getElementById("new-list").innerHTML = "Loading...";
  let searchInfo = document.getElementById("form-search").value;
  urlOption.q = searchInfo;
  laydulieu();
};
