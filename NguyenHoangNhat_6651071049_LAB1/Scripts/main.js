const products=[
{id:1,name:"MoYu RS3M 2024 3x3",category:"speed",price:189000,img:"p1",rating:4.9},
{id:2,name:"GAN 356 M 3x3",category:"speed",price:459000,img:"p2",rating:5},
{id:3,name:"QiYi Warrior 3x3",category:"speed",price:79000,img:"p3",rating:4.8},
{id:4,name:"MoYu Meilong 4x4",category:"special",price:159000,img:"p4",rating:4.8},
{id:5,name:"QiYi Pyraminx",category:"special",price:119000,img:"p5",rating:4.7},
{id:6,name:"QiYi Megaminx",category:"special",price:249000,img:"p6",rating:4.9},
{id:7,name:"Dầu bôi trơn Cube Lube",category:"accessory",price:65000,img:"p7",rating:4.8},
{id:8,name:"Thảm kê Rubik",category:"accessory",price:99000,img:"p8",rating:4.7}];
const cats=[["Speedcube 3x3","speed","p1"],["Rubik biến thể","special","p4"],["Phụ kiện","accessory","p7"],["Pyraminx","special","p5"],["Megaminx","special","p6"],["Thảm kê","accessory","p8"]];
const $=id=>document.getElementById(id),fmt=n=>n.toLocaleString("vi-VN")+"đ";
let cart=[],wish=new Set(),filter="all",term="",catOff=0,lsOff=[0,2,4];
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2000)}
function renderGrid(){const l=products.filter(p=>(filter==="all"||p.category===filter)&&p.name.toLowerCase().includes(term));
$("productGrid").innerHTML=l.length?l.map(p=>`<div class="pc"><div class="pi" style="background-image:url(Images/${p.img}.svg)"><ul><li><button data-wish="${p.id}">♥</button></li><li><button data-view="${p.id}">⇄</button></li><li><button data-add="${p.id}">🛒</button></li></ul></div><h6>${p.name}</h6><b>${fmt(p.price)}</b></div>`).join(""):"<p>Không tìm thấy sản phẩm.</p>"}
function renderCats(){$("catRow").innerHTML=[0,1,2,3].map(i=>{const c=cats[(catOff+i)%cats.length];return `<div class="cat" data-f="${c[1]}" style="background-image:url(Images/${c[2]}.svg)"><h5>${c[0]}</h5></div>`}).join("")}
function renderLists(){for(let k=0;k<3;k++)$("ls"+k).innerHTML=[0,1,2].map(i=>{const p=products[(lsOff[k]+i)%products.length];return `<div class="li"><img src="Images/${p.img}.svg" alt=""><div>${p.name}<b>${fmt(p.price)}</b></div></div>`}).join("")}
function renderCart(){const n=cart.reduce((s,x)=>s+x.q,0),t=cart.reduce((s,x)=>s+x.q*products[x.id-1].price,0);
$("cartCount").textContent=n;$("cartTotal").textContent=$("cartTotal2").textContent=fmt(t);$("wishCount").textContent=wish.size;
$("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products[x.id-1];return `<div class="ci"><img src="Images/${p.img}.svg" alt=""><div>${p.name}<br><b>${fmt(p.price)}</b></div><button data-q="${x.id}" data-d="-1">−</button>${x.q}<button data-q="${x.id}" data-d="1">+</button></div>`}).join(""):"<p>Giỏ hàng đang trống.</p>"}
function setFilter(f){filter=f;document.querySelectorAll(".tabs li").forEach(l=>l.classList.toggle("on",l.dataset.f===f));renderGrid()}
document.addEventListener("click",e=>{const g=s=>e.target.closest(s);let a;
if(a=g("[data-add]")){const id=+a.dataset.add,x=cart.find(c=>c.id===id);x?x.q++:cart.push({id,q:1});renderCart();toast("Đã thêm vào giỏ hàng!")}
if(a=g("[data-wish]")){const id=+a.dataset.wish;wish.has(id)?wish.delete(id):wish.add(id);renderCart();toast("Đã cập nhật yêu thích")}
if(a=g("[data-view]"))toast(products[a.dataset.view-1].name+" - "+products[a.dataset.view-1].rating+"/5 ★");
if(a=g("[data-q]")){const x=cart.find(c=>c.id===+a.dataset.q);x.q+=+a.dataset.d;if(x.q<1)cart=cart.filter(c=>c!==x);renderCart()}
if(a=g("[data-f]")){term="";setFilter(a.dataset.f);$("featured").scrollIntoView({behavior:"smooth"})}
if(a=g("[data-car]")){catOff=(catOff+(a.classList.contains("l")?cats.length-1:1))%cats.length;renderCats()}
if(a=g("[data-sl]")){const k=+a.dataset.sl,prev=a===a.parentElement.firstElementChild;lsOff[k]=(lsOff[k]+(prev?products.length-1:1))%products.length;renderLists()}});
$("depBtn").onclick=()=>$("depSide").style.display=$("depSide").style.display==="none"?"block":"none";
$("depSide").innerHTML=$("depList").innerHTML;
$("searchForm").onsubmit=e=>{e.preventDefault();term=$("searchInput").value.trim().toLowerCase();setFilter($("searchCat").value);$("featured").scrollIntoView({behavior:"smooth"})};
const open=()=>{$("drawer").classList.add("open");$("ov").classList.add("show")},close=()=>{$("drawer").classList.remove("open");$("ov").classList.remove("show")};
$("cartOpen").onclick=open;$("cartClose").onclick=close;$("ov").onclick=close;
$("wishBtn").onclick=()=>toast("Bạn có "+wish.size+" sản phẩm yêu thích");$("login").onclick=e=>{e.preventDefault();toast("Chức năng đăng nhập (demo)")};
$("checkoutBtn").onclick=()=>{if(!cart.length)return toast("Giỏ hàng đang trống");cart=[];renderCart();close();toast("Đặt hàng demo thành công!")};
$("newsletterForm").onsubmit=e=>{e.preventDefault();toast("Đăng ký nhận tin thành công!");e.target.reset()};
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>{document.querySelectorAll("nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active")});
renderGrid();renderCats();renderLists();renderCart();
