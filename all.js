const inputName = document.querySelector(".produceName");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const table = document.querySelector(".showTable");
const selectSort = document.querySelector(".selectSort");

let code = "N04";
let ary = [];
start();

window.addEventListener("resize",start);
console.log(window);

//判斷螢幕大小作表頭文字改變
function start(){
    if(window.innerWidth<=767){
        document.querySelector(".crop").innerText = "作物";
        document.querySelector(".market").innerText = "市場";
    }else{
        document.querySelector(".crop").innerText = "作物名稱";
        document.querySelector(".market").innerText = "市場名稱";
    }
}
//判斷選擇類別
search.addEventListener("click",function(e){
    const child = search.children;
    for(let i=0;i<child.length;i++){
        if(e.target.type!=="button"||e.target.className=="searchBtn"){
            
            return;
        }else if(child[i].value==e.target.value){
            e.target.classList.add("click");
            if(e.target.value=="蔬果"){
                code = "N04";

            }else if(e.target.value=="水果"){
                code = "N05";
               
            }else if(e.target.value=="花卉"){
                code = "N06";        
            }
        }else{
            child[i].classList.remove("click");
        }
    }
    
})

//搜尋獲得資料
searchBtn.addEventListener("click",function(e){
    let produceName = inputName.value.trim();
    
    
    if(produceName==""){
        alert("請輸入要查詢項目");
        table.children[2].innerHTML = `<td colspan="7">請輸入並搜尋想比價的作物名稱</td>`;
        table.children[0].innerHTML = "";
        selectSort.disabled = true;
        return;
    }

    selectSort.disabled = false;
    if(code=="N04"){
        getData(produceName,code);
                
    }else if(code=="N05"){
        getData(produceName,code);

    }else if(code=="N06"){
        getData(produceName,code);
    }
    
})

//請求資料
function getData(produceName,code){
    let str = "";
    axios.get('https://hexschool.github.io/js-filter-data/data.json')
        .then(function(response){       
            
            ary = response.data.filter(function(item){

                if(item.作物名稱==null){
                    return;
                }else if(item.作物名稱.indexOf(produceName)!=-1){
                    return (item.種類代碼==code);
                }
 
            });   
            console.log(ary); 
            if(ary.length==0){

                str = `<tr><td colspan="7">查詢不到當日交易資訊</td></tr>`;
                
            }else{
                ary.forEach(function(item,index){
                    str +=`<tr>
                    <td>${item.作物名稱}</td>
                    <td>${item.市場名稱}</td>
                    <td>${item.上價}</td>
                    <td>${item.中價}</td>
                    <td>${item.下價}</td>
                    <td>${item.平均價}</td>
                    <td>${item.交易量}</td>
                    </tr>`;
                })
            }            
            table.children[2].innerHTML = str;
            table.children[0].innerHTML = `查看「${produceName}」的比價結果`;
        })
}
let sortAry = [];
let sortType = "up";

//點擊表頭排序
table.addEventListener("click",function(e){

    let str = "";
    if(ary.length==0 ||window.innerWidth<=650){
        return;
    }
    if(e.target.className!=="showSort"){
        return;
    }
    switch(e.target.innerText){
        //先升後降
        case '上價':{ 
            
            if(sortType=="up"){
                sortAry = ary.sort(function(a,b){
                    return b.上價 - a.上價; 
                })
                sortType = "down";
                console.log(sortType);
            }else if(sortType=="down"){
                sortAry = ary.sort(function(a,b){
                    return a.上價 - b.上價; 
                })
                sortType = "up";
                console.log(sortType);
            }
            break;
        }
        case '中價':{ 

            if(sortType=="up"){
                sortAry = ary.sort(function(a,b){
                    return b.中價 - a.中價; 
                })
                sortType = "down";
                console.log(sortType);
            }else if(sortType=="down"){
                sortAry = ary.sort(function(a,b){
                    return a.中價 - b.中價; 
                })
                sortType = "up";
                console.log(sortType);
            }
            break;
        }
        case '下價':{ 

            if(sortType=="up"){
                sortAry = ary.sort(function(a,b){
                    return b.下價 - a.下價; 
                })
                sortType = "down";
                console.log(sortType);
            }else if(sortType=="down"){
                sortAry = ary.sort(function(a,b){
                    return a.下價 - b.下價; 
                })
                sortType = "up";
                console.log(sortType);
            }
            break;
        }
        case '平均價':{ 

            if(sortType=="up"){
                sortAry = ary.sort(function(a,b){
                    return b.平均價 - a.平均價; 
                })
                sortType = "down";
                console.log(sortType);
            }else if(sortType=="down"){
                sortAry = ary.sort(function(a,b){
                    return a.平均價 - b.平均價; 
                })
                sortType = "up";
                console.log(sortType);
            }
            break;
        }
        case '交易量':{ 

            if(sortType=="up"){
                sortAry = ary.sort(function(a,b){
                    return b.交易量 - a.交易量; 
                })
                sortType = "down";
                console.log(sortType);
            }else if(sortType=="down"){
                sortAry = ary.sort(function(a,b){
                    return a.交易量 - b.交易量; 
                })
                sortType = "up";
                console.log(sortType);
            }
            break;
        }
        default:{
            break;
        }
    }
    sortAry.forEach(function(item){
        str +=`<tr>
                <td>${item.作物名稱}</td>
                <td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td>
                </tr>`;
    })
    table.children[2].innerHTML = str;
})

selectSort.addEventListener("change",function(e){
    let str = "";
    switch(e.target.selectedIndex){
        case 1:{ 

            sortAry = ary.sort(function(a,b){
                return b.上價 - a.上價; 
            })
           
            break;
        }
        case 2:{ 

            sortAry = ary.sort(function(a,b){
                return b.中價 - a.中價; 
            })
 
            break;
        }
        case 3:{ 
             sortAry = ary.sort(function(a,b){
                return b.下價 - a.下價; 
            })
            break;
        }
        case 4:{ 

            sortAry = ary.sort(function(a,b){
                return b.平均價 - a.平均價; 
            })
                
            break;
        }
        case 5:{ 

            sortAry = ary.sort(function(a,b){
                return b.交易量 - a.交易量; 
            })
                
            break;
        }
        default:{
            break;
        }
    }
    sortAry.forEach(function(item){
        str +=`<tr>
                <td>${item.作物名稱}</td>
                <td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td>
                </tr>`;
    })
    table.children[2].innerHTML = str;
})