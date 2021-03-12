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
        programs = data[2].data;

        //All Programs
        blockCreator(programs);
        
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

        $("#city-select-sidebar").change(function() {
            var selectedVal= $(this).children("option:selected").val();
            $(".city-selected span").html(selectedVal);
          });

        //Select Filter 
        $('#citySelectFilter').on('change',function(){

          $("#blocks-body").empty();

          var filterValue =  $('#citySelectFilter').val();
          if(filterValue == 0){
            filterByCity(programs, 0);
          }else{
            filterByCity(programs, filterValue);
          }
        });

        //Text Search
        $("#search-text").on('keyup',function(){

          $("#blocks-body").empty();
          FilterByText(programs,$(this).val());
        });
    }
})

function blockCreator(programsData){
  for(var i=0 ; i<10 ; i++){
    $("#blocks-body").append('<div class="block">\
    <div class="img">\
      <img src="'+images[i]+'" alt="">\
    </div>\
    <div class="main">\
      <h6 class="subject">'+programsData[i].Name+'</h6>\
      <p>'+programsData[i].type+'</p>\
      <div class="info">\
        <span class="tuition-fee">Tuition Fee</span>\
        <span class="price"> <span>'+programsData[i].fee+'</span> $ Per Year</span>\
        <span class="city">'+programsData[i].city+'</span>\
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

//  Filter by city Function
function filterByCity(data, city){
  filteredData = [];
  if(city == 0){
    filteredData = data;
  }
  else{
    data.forEach(el=>{
      if(el.city == city){
        filteredData.push(el);
      }
    });
  }
  blockCreator(filteredData);
}

//Filter For Name Using text
function FilterByText(data, searcText){
    var filteredData = [];
    var searcText = searcText;
    data.forEach(prog=>{
      var progName = prog.Name.toLowerCase();
      if(progName.indexOf(searcText) != -1){
        filteredData.push(prog);
      }
    })
    blockCreator(filteredData);
}





