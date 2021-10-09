
      if(topSelected)
       {
           $(ele).addClass("top-selected");
           topCell.addClass("bottom-selected");
       }

       if(bottomSelected)
       {
           $(ele).addClass("bottom-selected");
           bottomCell.addClass("top-selected");
       }
       if(leftSelected)
       {
           $(ele).addClass("left-selected");
           leftCell.addClass("right-selected");
       }
       if(rightSelected)
       {
           $(ele).addClass("right-selected");
           rightCell.addClass("left-selected");
       }

 }else{

    $(".input-cell.selected").removeClass("selected top-selected bottom-selected left-selected right-selected");
 }


 $(ele).addClass("selected");
changeHeader(getRowCol(ele));
}

function changeHeader([rowId,colId])
{ 
    
    //###################################################################################
console.log(cellData);
   let data;

   if(cellData[selectedsheet][rowId - 1]!=undefined && cellData[selectedsheet][rowId - 1][colId - 1]!=undefined)
   { 
       data=cellData[selectedsheet][rowId - 1][colId - 1];
   }else{
 
     data=deafaultProperties;

   }

    $(".alignment.selected").removeClass("selected");
    $(`.alignment[data-type=${data.alignment}]`).addClass("selected");
    addRemoveSelectFromFontStyle(data, "bold");
    addRemoveSelectFromFontStyle(data, "italic");
    addRemoveSelectFromFontStyle(data, "underlined");
    $(`#fill-color`).css("border-bottom",`4px solid ${data.bgcolor}`)
    $("#text-color").css("border-bottom",`4px solid ${data.color}`);
    $("#font-family").css("font-family",data["font-family"]);
    $("#font-size").val(data["font-size"]);
    $("#font-family").val(data["font-family"]);

}

function addRemoveSelectFromFontStyle(data, property) {
    if (data[property]) {
        $(`#${property}`).addClass("selected");
    } else {
        $(`#${property}`).removeClass("selected");
    }
  }

function unselectCell(ele,e,topCell,bottomCell,leftCell,rightCell){

    if($(ele).attr("contenteditable")=="false"){

        if($(ele).hasClass("top-selected"))
        {
            topCell.removeClass("bottom-selected");
        }
        if($(ele).hasClass("bottom-selected"))
        {
            bottomCell.removeClass("top-selected");
        }
        if($(ele).hasClass("left-selected"))
        {
            leftCell.removeClass("right-selected");
        }
        if($(ele).hasClass("right-selected"))
        {
            rightCell.removeClass("left-selected");
        }
    
       $(ele).removeClass("selected top-selected bottom-selected left-selected right-selected");
    
    }
}



// to select multiple cells through mouse
let startcellSelected=false;
let startCell={};
let endCell={};
let scrollXRStarted = false;
let scrollXLStarted = false;

$(".input-cell").mousemove(function (e) {
    e.preventDefault();
        if(e.buttons==1 && !startcellSelected)
        {
            if (e.pageX > ($(window).width() - 10) && !scrollXRStarted) {
                scrollXR();
            } else if (e.pageX < (10) && !scrollXLStarted) {
                scrollXL();
            }

            let [rowId,colId]=getRowCol(this);
            startCell={"rowId":rowId,"colId":colId};
            startcellSelected=true;
             selectAllBetweenCells(startCell,startCell);
        }
})

$(".input-cell").mouseenter(function (e) {
    
    if(e.buttons==1 && startcellSelected)
    {
        if (e.pageX < ($(window).width() - 10) && scrollXRStarted) {
            clearInterval(scrollXRInterval);
            scrollXRStarted = false;
        }
  
        if (e.pageX > 10 && scrollXLStarted) {
            clearInterval(scrollXLInterval);
            scrollXLStarted = false;
        }

        let [rowId,colId]=getRowCol(this);
        endCell={"rowId":rowId,"colId":colId};
        selectAllBetweenCells(startCell,endCell);
    }else{
        startcellSelected=false;
    }
})


function selectAllBetweenCells(start, end) {

    $(".input-cell.selected").removeClass("selected top-selected bottom-selected left-selected right-selected");
    for (let i = Math.min(start.rowId, end.rowId); i <= Math.max(start.rowId, end.rowId); i++) {
        for (let j = Math.min(start.colId, end.colId); j <= Math.max(start.colId, end.colId); j++) {
            let [topCell, bottomCell, leftCell, rightCell] = getTopLeftBottomRightCell(i, j);
            selectCell($(`#row-${i}-col-${j}`)[0], { "ctrlKey": true }, topCell, bottomCell, leftCell, rightCell);
        }
    }
    }

    let scrollXRInterval;
    let scrollXLInterval;
    function scrollXR() {
      scrollXRStarted = true;
      scrollXRInterval = setInterval(() => {
          $("#cells").scrollLeft($("#cells").scrollLeft() + 100);
      }, 100);
    }
    
    
    function scrollXL() {
      scrollXLStarted = true;
      scrollXLInterval = setInterval(() => {
          $("#cells").scrollLeft($("#cells").scrollLeft() - 100);
      }, 100);
    }
    
      $(".data-container").mousemove(function (e) {
  e.preventDefault();
  if (e.buttons == 1) {
      if (e.pageX > ($(window).width() - 10) && !scrollXRStarted) {
          scrollXR();
      } else if (e.pageX < (10) && !scrollXLStarted) {
          scrollXL();
      }
  }
});

$(".data-container").mouseup(function (e) {
  clearInterval(scrollXRInterval);
  clearInterval(scrollXLInterval);
  scrollXRStarted = false;
  scrollXLStarted = false;
});

   
$(".alignment").click(function(e){

    let alignment=$(this).attr("data-type");
    $(".alignment.selected").removeClass("selected")
     $(this).addClass("selected");
     $(".input-cell.selected").css("text-align",alignment);
    // console.log(deafaultProperties);
     updateCellData("alignment",alignment);

    })
     

$("#bold").click(function(e) {
  
   setStyle(this,"bold","font-weight","bold");
})

$("#italic").click(function (e) {
    setStyle(this, "italic", "font-style", "italic");
  });
  
  $("#underlined").click(function (e) {
    setStyle(this, "underlined", "text-decoration", "underline");
  });
  

function setStyle(ele,property,key,value) {
    if($(ele).hasClass("selected"))
    {
          $(ele).removeClass("selected");
          $(".input-cell.selected").css(key,"");
        updateCellData(property,false);
         
    }else{

         $(ele).addClass("selected");
         $(".input-cell.selected").css(key,value);
         updateCellData(property,true);
         
    }

}


$(".pick-color").colorPick({
    'initialColor': "#abcd",
    'allowRecent': true,
    'recentMax': 5,
    'allowCustomColor': true,
    'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#ecf0f1", "#bdc3c7", "#95a5a6", "#7f8c8d"],
    'onColorSelected': function () {

    if($((this.element.children()[1])).attr("id")=="fill-color")
    {
        $(".input-cell.selected").css("background-color",this.color);
        $(this.element.children()[1]).css("border-bottom",`4px solid ${this.color}`);
        updateCellData("bgcolor",this.color);
    }

    if($((this.element.children()[1])).attr("id")=="text-color")
    {
        $(".input-cell.selected").css("color",this.color);
        $(this.element.children()[1]).css("border-bottom",`4px solid ${this.color}`);
        updateCellData("color",this.color);
    }



    }
});


$("#fill-color").click(function (e) {
    setTimeout(() => {
        $(this).parent().click();
    }, 10);
});

$("#text-color").click(function (e) {
    setTimeout(() => {
        $(this).parent().click();
    }, 10);
});

$(".menu-selector").change(function (e) {
    let value=$(this).val();
    let key=$(this).attr("id");

    if(key=="font-family")
    {
        $("#font-family").css(key,value);
    }
if(!isNaN(value))
{
    value=parseInt(value);
}

$(".input-cell.selected").css(key,value);
 updateCellData(key,value);

})



function  updateCellData(property ,value) {
  
    let newCellData=JSON.stringify(cellData);
    if(value != deafaultProperties[property])
        {
            $(".input-cell.selected").each(function (idx,data) {
                let [rowId,colId]=getRowCol(data);
                if(cellData[selectedsheet][rowId - 1]==undefined)
                {
                    cellData[selectedsheet][rowId - 1]={};
                    cellData[selectedsheet][rowId - 1][colId - 1]={...deafaultProperties};
                    cellData[selectedsheet][rowId - 1][colId - 1][property]=value;
                    

                }else{
                  
                     if(cellData[selectedsheet][rowId - 1][colId - 1]==undefined)
                     {
                        cellData[selectedsheet][rowId - 1][colId - 1]={...deafaultProperties};
                        cellData[selectedsheet][rowId - 1][colId - 1][property]=value;  

                    }else{

                        cellData[selectedsheet][rowId - 1][colId - 1][property]=value;  

                     }
                   
                 }
            })
            
    
        }else{

            $(".input-cell.selected").each(function (idx,data) {
                let [rowId,colId]=getRowCol(data);

                if(cellData[selectedsheet][rowId - 1] && cellData[selectedsheet][rowId - 1][colId - 1])
                {
                    cellData[selectedsheet][rowId - 1][colId - 1][property]=value;
                    if(JSON.stringify(cellData[selectedsheet][rowId - 1][colId - 1])==JSON.stringify(deafaultProperties))
                    {
                            delete cellData[selectedsheet][rowId - 1][colId - 1];       
                           if(Object.keys(cellData[selectedsheet][rowId - 1]).length == 0)
                           {
                               delete cellData[selectedsheet][rowId - 1];
                           }                    
                    }
   
                }
            })
        
        }

        if(saved && newCellData!=JSON.stringify(cellData))
        {
            saved=false;
        }
}





let lastlyaddedSheet=1;
let saved=true;

function addSheetEvents() {
    $(".sheet-tab.selected").on("contextmenu",function (e) {
        e.preventDefault();
        
            selectSheet(this);
        

       $(".sheet-options-modal").remove();
       let modal=$(`<div class="sheet-options-modal">
       <div class="option sheet-rename">Rename</div>
       <div class="option sheet-delete">Delete</div>
    </div>`);
    
     modal.css({"left":e.pageX});
     $(".container").append(modal);
   $(".sheet-rename").click(function (e) {
       
          let renameModal=$(`<div class="sheet-modal-parent">
          <div class="sheet-rename-modal">
              <div class="sheet-modal-title">Rename Sheet</div>
      
              <div class="sheet-modal-input-container">
                  <span class="sheet-modal-input-title">Rename Sheet</span>
                  <input class="sheet-modal-input" type="text"/>
              </div>
      
              <div class="sheet-modal-confirmation">
               <div class="button yes-button">Ok</div>
               <div class="button no-button">Cancel</div>
              </div>
      
          </div>
      </div>`)

     $(".container").append(renameModal);
     $(".sheet-modal-input").focus();

    $(".no-button").click(function (e) {
        $(".sheet-modal-parent").remove(); 
    })
    $(".yes-button").click(function (e) {
          
        renameSheet();
    })
  
    $(".sheet-modal-input").keypress(function (e) {
        if(e.key=='Enter')
        {
            renameSheet();
        }

    })


   })


   $(".sheet-delete").click(function (e) {
     
    if(totalSheet>1)
    {

        let deleteModal=$(`<div class="sheet-modal-parent">
        <div class="sheet-delete-modal">
            <div class="sheet-modal-title">${selectedsheet}</div>
    
            <div class="sheet-modal-detail-container">
                <span class="sheet-modal-detail-title">Are you Sure?</span>
            </div>
    
            <div class="sheet-modal-confirmation">
             <div class="button yes-button">Delete</div>
             <div class="button no-button">Cancel</div>
            </div>
    
        </div>
    </div>`)
   
      $(".container").append(deleteModal);
   
       $(".no-button").click(function (e) {
           $(".sheet-modal-parent").remove(); 
       })
   
       $(".yes-button").click(function (e) {
           
           deleteSheet();
           
       })
   

    }else{
        alert("this sheet cannot be deleted");
    }
    
   })
    
    })
    
    $(".sheet-tab.selected").click(function (e) {
    
            selectSheet(this);    
        
    })
    
    
}
addSheetEvents();


$(".add-sheet").click(function (params) {
    saved=false;
    console.log("hello2");
    lastlyaddedSheet++;
    totalSheet++;
    cellData[`Sheet${lastlyaddedSheet}`]={};
    $(".sheet-tab.selected").removeClass("selected");
    let sheet=$(`<div class="sheet-tab selected">Sheet${lastlyaddedSheet}</div>`)
    $(".sheet-tab-container").append(sheet);
    selectSheet();
    addSheetEvents();
    $(".sheet-tab.selected")[0].scrollIntoView();
})


function selectSheet(ele) {
    if( ele && !$(ele).hasClass("selected"))
    {
        $(".sheet-tab.selected").removeClass("selected");
        $(ele).addClass("selected");

    }
  emptyPreviousSheet();
  selectedsheet=$(".sheet-tab.selected").text();
   loadCurrentSheet();
   $("#row-1-col-1").click();
}

function emptyPreviousSheet() {
    let data = cellData[selectedsheet];
    let rowKeys = Object.keys(data);
    for (let i of rowKeys) {
        let rowId = parseInt(i);
        let colKeys = Object.keys(data[rowId]);
        for (let j of colKeys) {
            let colId = parseInt(j);
            let cell = $(`#row-${rowId + 1}-col-${colId + 1}`);
            cell.text("");
            cell.css({
                "font-family": "NotoSans",
                "font-size": 14,
                "background-color": "#fff",
                "color": "#444",
                "font-weight": "",
                "font-style": "",
                "text-decoration": "",
                "text-align": "left"
            });
        }
    }
  }
  
  function loadCurrentSheet() {
    let data = cellData[selectedsheet];
    let rowKeys = Object.keys(data);
    for (let i of rowKeys) {
        let rowId = parseInt(i);
        let colKeys = Object.keys(data[rowId]);
        for (let j of colKeys) {
            let colId = parseInt(j);
            let cell = $(`#row-${rowId + 1}-col-${colId + 1}`);
            cell.text(data[rowId][colId].text);
            cell.css({
                "font-family": data[rowId][colId]["font-family"],
                "font-size": data[rowId][colId]["font-size"],
                "background-color": data[rowId][colId]["bgcolor"],
                "color": data[rowId][colId].color,
                "font-weight": data[rowId][colId].bold ? "bold" : "",
                "font-style": data[rowId][colId].italic ? "italic" : "",
                "text-decoration": data[rowId][colId].underlined ? "underline" : "",
                "text-align": data[rowId][colId].alignment
            });
        }
    }
  }
  

  $(".container").click(function  (e) {
      $(".sheet-options-modal").remove();
  })



  function  renameSheet()
  {
       let newSheetName=$(".sheet-modal-input").val();
        if(newSheetName && !Object.keys(cellData).includes(newSheetName))
         {
             saved=false;
               let newCellData={};

        for(let i of Object.keys(cellData))
            {
                    if(i==selectedsheet)
                    {
                         newCellData[newSheetName]=cellData[i]; 

                    }else{
                        newCellData[i]=cellData[i];

                    }

            }

               cellData=newCellData;
              selectedsheet=newSheetName;

              $(".sheet-tab.selected").text(newSheetName);
              $(".sheet-modal-parent").remove();
         }else{

                if(!$(".sheet-modal-input-container").hasClass("present")){

                    $(".sheet-modal-input-container").append(`<div class="rename-error">Sheet name is not Valid or it already exists</div>`)
                    $(".sheet-modal-input-container").addClass("present");
                }
                

         }


  }

