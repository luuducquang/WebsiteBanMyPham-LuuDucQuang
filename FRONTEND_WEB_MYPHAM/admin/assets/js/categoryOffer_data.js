app.controller ('categoryOffer', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("CategoryOfferCtrl", function ($scope, $http) {
    $scope.ListDanhMucUuDai;

    var datas = {
        page: $scope.page,
        pageSize: 10
    }

    var categoryName = document.querySelector('#categoryName')
    var status = document.querySelector('.status')
    var describe = document.querySelector('#describe')

    $scope.GetDanhMucUuDai = function(){
        $http({
            method: 'POST',
            data: datas,
            url: current_url + '/api/DanhMucUuDai/search-danhmucuudai',
        }).then(function (response) {  
            $scope.ListDanhMucUuDai = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        });
        
        
    }
    $scope.GetDanhMucUuDai();
    
    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / datas.pageSize)
            var currentPage = $scope.page;
            var aItem = [];
            for (var i = 1; i < count + 1; i++) {
                let li = document.createElement('li')
                li.className = 'page-item'
                let a = document.createElement('a')
                a.className = 'page-link'
                li.appendChild(a)
                a.innerText = i
                aItem.push(a);
                $('.page-count').append(li)
                a.onclick = function () {
                    $scope.changePage(a.innerHTML)
                    a.href='#!categoryOffer/'+a.innerHTML
                }
            }    

            aItem[currentPage - 1].classList.add('activePage'); 
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                }
                window.location='#!categoryOffer/'+$scope.page
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                }
                window.location='#!categoryOffer/'+$scope.page
            }
    }
    

    $scope.changePage=function(i) {
        datas.page = i
        $scope.GetDanhMucUuDai()
    }

    $scope.checkBoxItem =[]

    $scope.toggleSelection = function(item){
        var idx = $scope.checkBoxItem.indexOf(item.Madanhmucuudai);
        if(idx >-1){
            $scope.checkBoxItem.splice(idx, 1);
        }
        else{
            $scope.checkBoxItem.push(item.madanhmucuudai);
        }
    }

    yesdel = function(){
        if($scope.checkBoxItem.length === 0){
            alert("chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.checkBoxItem,
                url: current_url + '/api/DanhMucUuDai/delete-danhmucuudai',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!categoryOffer/'+ $scope.page
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        categoryName.value=''
        describe.value=''
    }

    $scope.AddCategoryOffer = function(){
        if(categoryName.value==='' || describe.value===''){
            alert('không được bỏ trống')
            return
        }

        $http({
            method: 'POST',
            data: {
                Tendanhmucuudai: categoryName.value,
                DacBiet: status.value==="true",
                NoiDung: describe.value
            },
            url: current_url + '/api/DanhMucUuDai/create-danhmucuudai',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) { 
            alert('Thêm thành công');
            window.location='#!categoryOffer/'+$scope.page
        })
        .catch(function (error) {
            console.error('Lỗi khi thêm :', error);
        });
    }
    
    $scope.addItem = function(){
        $scope.AddCategoryOffer(); 
    }


    $scope.Madanhmucuudai
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        categoryName.value = x.tendanhmucuudai
        status.value = x.dacBiet
        describe.value = x.noiDung
        document.querySelector('.saveAdd').style.display = 'none'
        document.querySelector('.saveEdit').style.display = 'block'
        $scope.Madanhmucuudai = x.madanhmucuudai
    }

    $scope.editItem=function(){
        if(categoryName.value==='' || status.value===''|| describe.value===''){
            alert('không được bỏ trống')
            return
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    Madanhmucuudai: $scope.Madanhmucuudai,
                    Tendanhmucuudai: categoryName.value,
                    DacBiet: status.value==="true",
                    NoiDung: describe.value
                },
                url: current_url + '/api/DanhMucUuDai/update-danhmucuudai',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Sửa thành công')
                window.location='#!categoryOffer/'+$scope.page
            })
            .catch(function (error) {
                console.error('Lỗi khi sua:', error);
            });
        }
    }
});