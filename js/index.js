//sideBar
$('#btnSlider').click(function(){
    let widthSlider=$('#sliderNav').outerWidth() //200
    let offsetIconNav=$('#iconNav').offset().left 
    
    if($('#sliderNav').css('left')==='-200px')
    {
        $('#sliderNav').animate({left:`${0}`},500)
        $('#iconNav').animate({left:`${0}`},500)
        $('#btnSlider').removeClass('fa-solid fa-align-justify') 
        $('#btnSlider').addClass('fa-solid fa-xmark')
        animateLinkesOpen()
    }
    else
    {
        $('#btnSlider').removeClass('fa-solid fa-xmark')
        $('#btnSlider').addClass('fa-solid fa-align-justify')
        $('#sliderNav').animate({left:`-${widthSlider}`},500)
        $('#iconNav').animate({left:`-${offsetIconNav}`},500)
        animateLinkesOut()
    }
})
// animate when open sidebar
function animateLinkesOpen()
{
        $('#linkOne').animate({opacity:'1',paddingTop:'25px'},150,function(){
            $('#linkTwo').animate({opacity:'1',paddingTop:'25px'},150,function(){
                $('#linkThree').animate({opacity:'1',paddingTop:'25px'},150,function(){
                    $('#linkFour').animate({opacity:'1',paddingTop:'25px'},150,function(){
                        $('#linkFive').animate({opacity:'1',paddingTop:'25px'},150)
                    })
                })
            })
        })
}
//animate when out sidebar
function animateLinkesOut()
{
    $('#linkOne').animate({opacity:'1',paddingTop:'400px'},100,function(){
        $('#linkTwo').animate({opacity:'1',paddingTop:'400px'},100,function(){
            $('#linkThree').animate({opacity:'1',paddingTop:'400px'},100,function(){
                $('#linkFour').animate({opacity:'1',paddingTop:'400px'},100,function(){
                    $('#linkFive').animate({opacity:'1',paddingTop:'400px'},100)
                })
            })
        })
    })
}



$(document).ready(function(){
    $('.fa-spinner').fadeOut(500,function(){
        $('#loading').fadeOut(500,function(){
            $('#loading').remove()
            $('body').css('overflow','auto')
        })
    })
})




//get api for home
async function homeApi()
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s= `)
    response= await response.json()
    let homeOfMeals=response.meals
    //show meals
    function displaySearch()
    {
        
        let meals=''
        for(let i=0;i<homeOfMeals.length;i++)
        {
            meals+=`<div  onclick="getDetaielsMeals(${homeOfMeals[i].idMeal})"  class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${homeOfMeals[i].strMealThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${homeOfMeals[i].strMeal}</p>
                 </div>
            </div>

         </div>`


        }
       
        document.getElementById('rowDataHome').innerHTML=meals

      


       console.log(searchOfMeals);
    }
    displaySearch()

   
    



}
homeApi()


//get id meal and show in container details
async function getDetaielsMeals(mealId)
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    response= await response.json()
    let mealDetails=response.meals
    console.log(mealDetails);

    function showDetailes()
    {
        let meal=mealDetails[0].strMealThumb
        document.getElementById('mealIdImag').setAttribute('src',meal)
        document.getElementById('strMeal').innerHTML=mealDetails[0].strMeal
        document.getElementById('strInstructions').innerHTML=mealDetails[0].strInstructions
        document.getElementById('strArea').innerHTML=mealDetails[0].strArea
        document.getElementById('strCategory').innerHTML=mealDetails[0].strCategory
        document.getElementById('strSource').setAttribute('href',mealDetails[0].strSource)
        document.getElementById('strYoutube').setAttribute('href',mealDetails[0].strYoutube)
        document.getElementById('strTags').innerHTML=mealDetails[0].strTags

        recipes(mealDetails[0])

        function recipes(mealdetails)
        {
            let Recipes=''
            for(let i=1;i<=20;i++)
            {
                if(mealdetails[`strIngredient${i}`])
                {
                    Recipes+=`<div class="recipes-item  bg-white w-auto text-black rounded m-2 p-1">${mealdetails[`strMeasure${i}`]} ${mealdetails[`strIngredient${i}`]}</div>`
                }

            }
            document.getElementById('recipesRow').innerHTML=Recipes

        }

     

    }
    showDetailes()
    
    
    console.log(mealDetails);
    $('#showDetailsMeals').fadeIn(500)
    $('#showDetailsMeals').removeClass('d-none')
    $('#homeMeals').fadeOut(500)

    $('#showDetailsMeals').fadeIn(500)
    $('#categoryFilter').addClass('d-none')
    $('#categoryFilter').fadeOut(500)

    $('#showDetailsMeals').fadeIn(500)
    $('#areaFilter').addClass('d-none')
    $('#areaFilter').fadeOut(500)

    $('#showDetailsMeals').fadeIn(500)
    $('#ingredientsFilter').addClass('d-none')
    $('#ingredientsFilter').fadeOut(500)

    $('#showDetailsMeals').fadeIn(500)
    $('#search').addClass('d-none')
    $('#search').fadeOut(500)
    
    
    
    
}










//get api search
async function searchApi(NameValue)
{
    
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${NameValue}`)
    response= await response.json()
    let searchOfMeals=response.meals
    
    //show meals
    function displaySearch()
    {
        let meals=''
        for(let i=0;i<searchOfMeals.length;i++)
        {
            meals+=`<div onclick="getDetaielsMeals('${searchOfMeals[i].idMeal}')" class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${searchOfMeals[i].strMealThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${searchOfMeals[i].strMeal}</p>
                 </div>
            </div>

         </div>`

        }
        document.getElementById('rowDataOfSearch').innerHTML=meals

       console.log(searchOfMeals);
    }
    displaySearch()
    
}
//get value frome input search
let search =document.getElementById('searchByName')
search.addEventListener('input',function(){
    let searchByNameVlue=search.value
    searchApi(searchByNameVlue)
 })



//get Api search frist latter
 async function searchFirstApi(latter)
 {
    let searchOfFirst= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${latter}`)
    searchOfFirst= await searchOfFirst.json()
    let searchFirst=searchOfFirst.meals
    console.log(searchFirst)
    //show meals
    function displaySearch()
    {
        let meals=''
        for(let i=0;i<searchFirst.length;i++)
        {
            meals+=`<div onclick="getDetaielsMeals('${searchFirst[i].idMeal}')" class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${searchFirst[i].strMealThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${searchFirst[i].strMeal}</p>
                 </div>
            </div>

         </div>`

        }
        document.getElementById('rowDataOfSearch').innerHTML=meals

       console.log(searchOfMeals);
    }
    displaySearch()

 }
 //get value from input search frist latter
 let searchFirstInput =document.getElementById('searchFirstLetter')
 searchFirstInput.addEventListener('input',function(){
    let searchByFirstLatterValue=searchFirstInput.value
    searchFirstApi(searchByFirstLatterValue)
 })










//get category api 
 async function categoryApi()
 {
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response= await response.json()
    let categoriesMeals=response.categories

    function displayCategories()
    {
        let categories=''
        for(let i=0;i<categoriesMeals.length;i++)
        {
            categories+=`<div  onclick="categoriesFilterApi('${categoriesMeals[i].strCategory}')"  class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${categoriesMeals[i].strCategoryThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${categoriesMeals[i].strCategory}</p>
                 </div>
            </div>

         </div>`
         
        }
        document.getElementById('rowDataCategory').innerHTML=categories
        

    }
    displayCategories()

    
   

 }
 categoryApi()

// get gategory filter meal
async function categoriesFilterApi(categoryMeal)
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryMeal}`)
    response= await response.json()
    let categoriesFilterMeals=response.meals
    console.log(categoriesFilterMeals);

    function displayCategoriesFilter()
    {
        let meal=''
        for(let i=0;i<categoriesFilterMeals.length;i++)
        {
            meal+=`<div onclick="getDetaielsMeals(${categoriesFilterMeals[i].idMeal})"  class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${categoriesFilterMeals[i].strMealThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded overflow-hidden" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${categoriesFilterMeals[i].strMeal}</p>
                 </div>
            </div>

         </div>`

        }
        document.getElementById('rowDataCategoryFilter').innerHTML=meal
        
    }
    displayCategoriesFilter()
    
    
    $('#categoryFilter').fadeIn(500)
    $('#categoryFilter').removeClass('d-none')
    $('#category').addClass('d-none')
    $('#category').fadeOut(500)
    

}






// get area api
async function areaApi()
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response= await response.json()
    let areaApi=response.meals

    // console.log(areaApi);

    function displayArea()
    {
        let area=''
        for(let i=0;i<areaApi.length;i++)
        {
            area+=`<div onclick="areaFilter('${areaApi[i].strArea}')" class="col-md-3 text-center my-2">
            <i class="fa-solid fa-city"></i>
            <h2 class="text-white fw-lighter">${areaApi[i].strArea}</h2>
            </div>`
        }
        document.getElementById('rowDataArea').innerHTML=area
    }
    displayArea()

}
areaApi()

//get area filter region
async function areaFilter(a)
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`)
    response= await response.json()
    let areaFilterApi=response.meals
    // console.log(areaFilterApi);

    function displayareaFilter()
    {
        let area=''
        for(let i=0;i<areaFilterApi.length;i++)
        {
            area+=`<div onclick="getDetaielsMeals(${areaFilterApi[i].idMeal})"    class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${areaFilterApi[i].strMealThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${areaFilterApi[i].strMeal}</p>
                 </div>
            </div>

         </div>`
        }
        document.getElementById('rowDataAreaFilter').innerHTML=area
    }
    displayareaFilter()
    $('#area').fadeOut(500)
    $('#areaFilter').fadeIn(500)
    $('#areaFilter').removeClass('d-none')



}




//get ingredient api
async function ingredientsApi()
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response= await response.json()
    let ingredientsMeals=response.meals

    function displayIngredients()
    {
        let ingredients=''
        for(let i=0; i<21;i++)
        {
            ingredients+=` <div onclick="ingredientFilter('${ingredientsMeals[i].strIngredient}')"  class="col-md-3 text-center my-2">
            <i class="fa-solid fa-bowl-food"></i>
            <h2 class="text-white fw-lighter">${ingredientsMeals[i].strIngredient}</h2>
            <p class=" text-white">${ingredientsMeals[i].strDescription.slice(0, 65)}</p>
        </div>`
        }
        document.getElementById('rowDataIngredients').innerHTML=ingredients
    }
    
    displayIngredients()
    

}
ingredientsApi()

//get ingredient filter 
async function ingredientFilter(ingredientMeal)
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientMeal}`)
    response= await response.json()
    let ingredientFMeals=response.meals
    console.log(ingredientFMeals);


    function displayIngredientFilter()
    {
        let IngredientF=''

        for(i=0;i<ingredientFMeals.length;i++)
        {
            IngredientF+=`<div  onclick="getDetaielsMeals(${ingredientFMeals[i].idMeal})"  class="col-md-3 overflow-hidden my-3">
            <div class="position-relative   rounded content " >
                 <div><img src="${ingredientFMeals[i].strMealThumb}" class="w-100 rounded" ></div>

                 <div class="show-meal d-flex justify-content-start align-items-center position-absolute show-meal-name rounded" >
                     <p id="mealName" class="fw-lighter fs-2 px-2">${ingredientFMeals[i].strMeal}</p>
                 </div>
            </div>

         </div>`

        }
        document.getElementById('rowDataIngredientsFilter').innerHTML=IngredientF
    }
    displayIngredientFilter()

    $('#ingredients').fadeOut(500)
    $('#ingredientsFilter').fadeIn(500)
    $('#ingredientsFilter').removeClass('d-none')

}

//move tabs
$('#linkOne').click(function(){
    $('#search').siblings('section').fadeOut(500).addClass('d-none')
    $('#search').fadeIn(500).removeClass('d-none')
})
$('#linkTwo').click(function(){
    $('#category').siblings('section').fadeOut(500).addClass('d-none')
    $('#category').fadeIn(500).removeClass('d-none')
})
$('#linkThree').click(function(){
    $('#area').siblings('section').fadeOut(500).addClass('d-none')
    $('#area').fadeIn(500).removeClass('d-none')
})
$('#linkFour').click(function(){
    $('#ingredients').siblings('section').fadeOut(500).addClass('d-none')
    $('#ingredients').fadeIn(500).removeClass('d-none')
})
$('#linkFive').click(function(){
    $('#contact').siblings('section').fadeOut(500).addClass('d-none')
    $('#contact').fadeIn(500).removeClass('d-none')
})


const nameInput=document.getElementById('name')
const wrongNameInput=document.getElementById('wrongName')
nameInput.addEventListener('keyup',function(){
    if(validatName()==true)
    {
        nameInput.classList.add('valied')
        nameInput.classList.remove('invalid')
        wrongNameInput.classList.add('d-none')
    }
    else
    {
        nameInput.classList.add('invalid')
        nameInput.classList.remove('is-valied')
        wrongNameInput.classList.remove('d-none')

    }
})

function validatName()
{
    if(/^[a-zA-Z ]+$/.test(nameInput.value)==true) 
    {
        return true
    }
    else
    {
        return false
    }
}

//Mail Input Validat
const wrongMailInput=document.getElementById('wrongMailInput')
const mailInput=document.getElementById('email')
mailInput.addEventListener('keyup',function(){
    if(validatMail()==true)
    {
        mailInput.classList.add('valied')
        mailInput.classList.remove('invalid')
        wrongMailInput.classList.add('d-none')

    }
    else
    {
        mailInput.classList.add('invalid')
        mailInput.classList.remove('is-valied')
        wrongMailInput.classList.remove('d-none')

    }
})
function validatMail()
{
   if(/^[a-zA-Z0-9 ]+@(yahoo|gmail)\.com$/.test(mailInput.value)==true)
   {
    return true
   }
   else
   {
    return false
   }
   

}

// phone input validat
const phoneInput=document.getElementById('phone')
const wrongPhoneInput=document.getElementById('wrongPhoneInput')
phoneInput.addEventListener('keyup',function(){
    if(validatPhone()==true)
    {
        phoneInput.classList.add('valied')
        phoneInput.classList.remove('invalid')
        wrongPhoneInput.classList.add('d-none')

    }
    else
    {
        phoneInput.classList.add('invalid')
        phoneInput.classList.remove('is-valied')
        wrongPhoneInput.classList.remove('d-none')
    }

})
function validatPhone()
{
     
    if(/^2?01[0125][0-9]{8}$/.test(phoneInput.value)==true)
    {
        return true
    }
    else
    {
        return false
    }
}
//age input validate
const ageInput=document.getElementById('age')
const wrongAgeInput=document.getElementById('wrongAgeInput')

ageInput.addEventListener('keyup',function(){
    if(validatAge()==true)
    {
        ageInput.classList.add('valied')
        ageInput.classList.remove('invalid')
        wrongAgeInput.classList.add('d-none')

    }
    else
    {
        ageInput.classList.add('invalid')
        ageInput.classList.remove('is-valied')
        wrongAgeInput.classList.remove('d-none')
    }

})

function validatAge()
{
    
    if(/^([1-9][0-9]|100)$/.test(ageInput.value)==true)
    {
       return true
    }
    else
    {
       return false
    }
}


//password iput validate
const passwordInput=document.getElementById('password')
const wrongPasswordInput=document.getElementById('wrongPasswordInput')
passwordInput.addEventListener('keyup',function(){
    if(validatePassword()==true)
    {
        passwordInput.classList.add('valied')
        passwordInput.classList.remove('invalid')
        wrongPasswordInput.classList.add('d-none')

    }
    else
    {
        passwordInput.classList.add('invalid')
        passwordInput.classList.remove('is-valied')
        wrongPasswordInput.classList.remove('d-none')

    }

})

function validatePassword()
{
    
    if(/^[A-Za-z].{7}$/.test(passwordInput.value)==true)
    {
        return true
    }
    else
    {
        return false
    }
}
 const rePasswordInput=document.getElementById('rePassword')
 const  wrongrePasswordInput=document.getElementById('wrongrePasswordInput')
 rePasswordInput.addEventListener('keyup',function(){
    if(validatRePassword()==true)
    {
        rePasswordInput.classList.add('valied')
        rePasswordInput.classList.remove('invalid')
        wrongrePasswordInput.classList.add('d-none')

    }
    else
    {
        rePasswordInput.classList.add('invalid')
        rePasswordInput.classList.remove('is-valied')
        wrongrePasswordInput.classList.remove('d-none')
    }
 })

 function validatRePassword()
 {
    if(passwordInput.value==rePasswordInput.value)
    {
        return true
    }
    else
    {
        return false
    }
 }


//  const btnSubmit=document.getElementById('btnSubmit')
//  if((validatName()==true) && (validatMail()==true ) && (validatPhone()==true) && (validatAge()==true) && (validatePassword()==true) && (validatRePassword()==true))
//  {
//     console.log('mzbot');
//     $('#btnSubmit').css('color','blue')
    
    // $('#btnSubmit').hover(function () {
    //         // over
    //         $('#btnSubmit').css('backgroundColor','red')
            
    //     }, function () {
    //         // out
    //         $('#btnSubmit').css('backgroundColor','transparent')
    //     }
    // );
//  }
//  else
//  {
//     console.log('mshmzbot');
//  }