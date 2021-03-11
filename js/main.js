var navLinks = document.querySelectorAll('.navbar .nav-link');
navLinks.forEach(link=>{
    link.addEventListener('click',function(){
        navLinks.forEach(el=>{
            el.classList.remove('active');
        })
        link.classList.add('active');
    })
});
//my images
var images = ["images/IUBH.png", "images/IESEG.png", "images/IESA.png", "images/Cours Florent.png",
              "images/ISEP.png","images/IPAG.png","images/Le Cordon Bleue.jpg", "images/Paris school of Business.jpg",
               "images/Montpellier BS.png", "images/Toulouse Business School.jpg"];
// Json File Read
$.ajax({
    url: './progs.json',
    contentType: "application/json",
    dataType: 'json',
    success: function(data){
        console.log(data);
        programs = data[2].data;

        //All Citites
        var cities=[] ;
        for(var i = 0 ; i<programs.length ; i++){
            let city = programs[i].city;
            let bool = cities.indexOf(city) +1;
            if(!bool){
                cities.push(programs[i].city);
            }
        }

        //city Select
        for(var i =0 ; i <cities.length ; i++){
            $(".city-select").append('<option value="'+cities[i]+'">'+cities[i]+'</option>');
        }
 
        $(".city-select").change(function() {
            var selectedVal= $(this).children("option:selected").val();
            $(".city-selected span").html(selectedVal);
          });


        //program blocks
        for(var i=0 ; i<10 ; i++){
            $("#blocks-body").append('<div class="block">\
            <div class="img">\
              <img src="'+images[i]+'" alt="">\
            </div>\
            <div class="main">\
              <h6 class="subject">'+programs[i].Name+'</h6>\
              <p>'+programs[i].type+'</p>\
              <div class="info">\
                <span class="tuition-fee">Tuition Fee</span>\
                <span class="price"> <span>'+programs[i].fee+'</span> $ Per Year</span>\
                <span class="city">'+programs[i].city+'</span>\
              </div>\
            </div>\
            <button class="more-info btn">More Info</button>\
          </div>')
          if(i==0){
                $(".block").css("border-top-right-radius","10px");
                $(".block").css("border-top-left-radius","10px");
          }
          if(i==10){
            $(".block").css("border-bottom-right-radius","10px");
            $(".block").css("border-bottom-left-radius","10px");
          }
        }
    }
})

