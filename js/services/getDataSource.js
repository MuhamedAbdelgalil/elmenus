(function(elmenusApp){
    elmenusApp.service("getData",function(){
        this.getElmenusData = function(){
             $http.get("js/data.js")
             .then(function (response) {
                 return response.data.categories;
            });
        }
       
    });

}(elmenusApp))