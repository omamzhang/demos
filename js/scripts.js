function isType(t){return function(o){return Object.prototype.toString.call(o)==="[object "+t+"]"}}var vm=new Vue({el:"#app",data:{infoQ:{name:"商品名",code:"test02",brand:"品牌",tag:"现货",imgs:["http://","http://","http://"],brand:"SYL",price:"0.01",colors:["红","黄","蓝","绿"],sizes:["S","M","L"],sku:{"红":{sizes:[10,12,1],total:0},"黄":{sizes:[10,12,1],total:0},"蓝":{sizes:[10,12,1],total:0},"绿":{sizes:[10,12,1],total:0}}},info:{},cart:{},counting:{key:"",color:"",sku:0,size:"",count:0,sizes:"",diff:0},total:{count:0,price:0}},watch:{"counting.count":function(t,o){var n=this.counting,e=this.info.sku;e[n.color].total=n.total}},computed:{_price:function(){return this.info.price},_size:function(){return this.info.sizes},isActive:function(){return!!this.total.count},checkedKey:function(){return this.counting.color+"_"+this.counting.size},colorsPack:function(){return(this.info.colors||[]).join(",")},sizesPack:function(){return(this.info.sizes||[]).join(",")},imgSlide:function(){var t=this.info.imgs||[];return{total:t.length,current:0,src:t}}},methods:{showCover:function(){var t=document.documentElement.querySelector(".cover");t.style.display="block"},hideCover:function(){var t=document.documentElement.querySelector(".cover");t.style.display="none"},toggleCheck:function(t){var o=t.target.dataset,n=this.counting;for(var e in n)n[e]=o[e];var i=this.cart,r=o.color,c=o.size;i[r]?(i[r][c]||(i[r][c]=0),void 0===typeof i[r].total&&(i[r].total=0)):(i[r]={},i[r][c]=0,i[r].total=0),n.count=i[r][c],n.total=i[r].total,n.key=r+"_"+c},inputCounter:function(t){var o=this.counting,n=0;""===o.key&&alert("请选择商品"),n=t.target.value,/^\s*$/.test(n)?n="":/^[1-9]\d*|0$/g.test(n)?(n=+n,sku=+o.sku,n>sku&&(n=sku)):n=0,t.target.value=n,o.count!=n&&this.cartUpdate(n)},counter:function(t){var o=this.counting;if(""===o.key)return alert("请选择商品");var n=o.sku,e=+t.target.dataset.flag,i=e,r=+o.count+e;if(r<0?(r=0,i=0):r>n&&(r=n,i=0),i){return void this.cartUpdate(r);var r}},createOrder:function(){this.total.count?this.hideCover():alert("您还未选择商品")},getProductDetail:function(){var t=this;axios.get("/h5/data/product.json",{params:{id:"test02"}}).then(function(o){var n=o.data;n.hasError?alert(n.message):t.info=n.data})["catch"](function(t){})},cartUpdate:function(t){var o=this.counting;o.count=t;var n=this.cart,e=n[o.color];e[o.size]=o.count;for(var i=this.info.sizes,r=0,c=0,a=i.length;c<a;c++){var s=e[i[c]];r+=s||0}e.total=r,o.total=r,console.clear(),console.log("--- total --");var t=0;for(var u in n)t+=+n[u].total,console.log(u,n[u]);this.total.count=t,this.total.price=(t*this._price).toFixed(2)}},mounted:function(){this.getProductDetail()}});