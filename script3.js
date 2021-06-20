let currenCategory = "top-stories";
const API_KEY = "ca657305aab940bf81ecae8b86b421bd";

const laydulieu = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let dulieu = data.articles;
  console.log(dulieu);
  render(dulieu);
};
laydulieu();

const render = (dulieu) => {
  document.getElementById("new-list").innerHTML = dulieu.map(
    (tungphantumang) => {
      return `<li class="media info">
      <div class="media-body">
        <h5 class="mt-0 mb-1">${tungphantumang.title}</h5>
        <p>
          ${tungphantumang.content}
        </p>
      </div>
      <img src="${tungphantumang.urlToImage}" class="ml-3" alt="..." />
    </li>`;
    }
  );
};

//add class active vao side menu
const addClass = (category) => {
  document.getElementById(currenCategory).classList.remove("active");
  document.getElementById(category).classList.add("active");
  document.getElementById("category-title").innerHTML = category
    .split("-")
    .join(" ")
    .toUpperCase();
  currenCategory = category;
};
//ban dau active o top stories
addClass(currenCategory);

//khi click vao sidemenu goi ham add kia ra
const handleClickMenu = async (category) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  let dulieu = data.articles;

  render(dulieu);
  addClass(category);
};
