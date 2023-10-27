app.controller ('manufacturer', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tenhangsearch = $routeParams.tenhangsearch;
}]);

app.controller("ManufacturerCtrl", function ($scope, $http) {
    $scope.submit = "Thêm mới";
	$scope.listManufacturer;	
    $scope.pageSize=10
    $scope.Image
    $scope.MaNhaSanXuat

    $scope.GetManufacturer= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize,
                TenHang: $scope.tenhangsearch
            },
            url: current_url + '/api/HangSanXuat/search-hangsanxuat',
        }).then(function (response) {  
            $scope.listManufacturer = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetManufacturer();

    //-------------------------------------------------------------------------------------//
    $scope.timkiem = $scope.tenhangsearch
    $scope.search = function(){
        if($scope.timkiem===undefined){
            $scope.tenhangsearch=''
        }
        else{
            $scope.tenhangsearch = $scope.timkiem
            var data = {
                page: 1,
                pageSize: 10,
                TenHang: $scope.tenhangsearch
            };
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token },
                data: data,
                url: current_url + '/api/HangSanXuat/search-hangsanxuat',
            }).then(function (response) {  
                console.log(response);
                if(response.data.totalItems===0){
                    alert("Không có hãng sản xuất nào")
                    $scope.tenhangsearch =''
                    return
                }
                else{
                    window.location='#!manufacturer/1/'+$scope.tenhangsearch
                }
            }).catch(function (error) {
                console.error('Lỗi :', error);
            });
        }
    }
    //-------------------------------------------------------------------------------------//

    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / $scope.pageSize)
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
                    if($scope.tenhangsearch){
                        a.href='#!manufacturer/'+a.innerHTML+'/'+$scope.tenhangsearch
                    }
                    else{
                        a.href='#!manufacturer/'+a.innerHTML
                    }
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');

            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    if($scope.tenhangsearch){
                        window.location='#!manufacturer/'+$scope.page+'/'+$scope.tenhangsearch
                    }
                    else{
                        window.location='#!manufacturer/'+$scope.page
                    }
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    if($scope.tenhangsearch){
                        window.location='#!manufacturer/'+$scope.page+'/'+$scope.tenhangsearch
                    }
                    else{
                        window.location='#!manufacturer/'+$scope.page
                    }
                }
            }
    }
    
    $scope.changePage=function(i) {
        $scope.page = i
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maNhaSanXuat);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maNhaSanXuat);
            console.log($scope.selected);
        }
    }

    yesdel = function(){
        if($scope.selected.length === 0){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.selected,
                url: current_url + '/api/HangSanXuat/delete-hangsanxuat',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Xoá thành công')
                if($scope.tenhangsearch){
                    window.location='#!manufacturer/'+$scope.page+'/'+$scope.tenhangsearch
                }
                else{
                    window.location='#!manufacturer/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
        $scope.tenhang=''
        $scope.linkweb=''
        preview.src=''
    }

    var preview = document.querySelector('.ImgProduct')
    $scope.getFilePathProduct=function(){
        $('#Image').change(function () {
            var file = this.files[0]
            if(!file){
                return
            }
            if(file.size / (1024*1024)>5){
                alert("File không được quá 5MB")
            }
            if (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function(e){
                    preview.src = e.target.result
                }
            }
        });
    }
    $scope.getFilePathProduct()

    $scope.save = function(){
        if($scope.tenhang===''||$scope.linkweb===''){
            alert("Vui lòng nhập đủ thông tin")
            return
        }
        var file = document.getElementById('Image').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                preview.src = "../img"+ $scope.Image

                if($scope.submit==="Thêm mới"){
                    $http({
                        method: 'POST',
                        data: {
                            TenHang: $scope.tenhang,
                            LinkWeb: $scope.linkweb,
                            AnhDaiDien: "../img"+$scope.Image
                        },
                        url: current_url + '/api/HangSanXuat/create-hangsanxuat',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        alert('Thêm thành công')
                    }).catch(function (error) {
                        console.error('Lỗi khi thêm sản phẩm:', error);
                    });
                }
                else{
                    $http({
                        method: 'PUT',
                        data: {
                            MaNhaSanXuat: $scope.MaNhaSanXuat,
                            TenHang: $scope.tenhang,
                            LinkWeb: $scope.linkweb,
                            AnhDaiDien: "../img"+$scope.Image
                        },
                        url: current_url + '/api/HangSanXuat/update-hangsanxuat',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        alert('Sửa thành công')
                    }).catch(function (error) {
                        console.error('Lỗi khi sửa sản phẩm:', error);
                    });
                }
            });
        }
        else{
            if($scope.submit==="Thêm mới"){
                $http({
                    method: 'POST',
                    data: {
                        TenHang: $scope.tenhang,
                        LinkWeb: $scope.linkweb,
                        AnhDaiDien: "../img"+$scope.Image
                    },
                    url: current_url + '/api/HangSanXuat/create-hangsanxuat',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    alert('Thêm thành công')
                    if($scope.tenhangsearch){
                        window.location='#!manufacturer/'+$scope.page+'/'+$scope.tenhangsearch
                    }
                    else{
                        window.location='#!manufacturer/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            }
            else{
                $http({
                    method: 'PUT',
                    data: {
                        MaNhaSanXuat: $scope.MaNhaSanXuat,
                        TenHang: $scope.tenhang,
                        LinkWeb: $scope.linkweb,
                        AnhDaiDien: $scope.anhhang
                    },
                    url: current_url + '/api/HangSanXuat/update-hangsanxuat',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    alert('Sửa thành công')
                    if($scope.tenhangsearch){
                        window.location='#!manufacturer/'+$scope.page+'/'+$scope.tenhangsearch
                    }
                    else{
                        window.location='#!manufacturer/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.MaNhaSanXuat = x.maNhaSanXuat
        $scope.tenhang = x.tenHang
        $scope.linkweb = x.linkWeb
        $scope.anhhang = x.anhDaiDien
        preview.src = x.anhDaiDien
    }
})