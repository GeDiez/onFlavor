 $(document).ready(function () {
   $(".delete").on('click',function(event){
    let id = $(this).data('place-id');
    let $parent = $(this).parents('li');
    event.preventDefault();
     $.ajax({
       url: 'http://localhost:3000/api/places/'+id,
       type: 'DELETE',
       dataType: 'json',
       success: function (data, textStatus, xhr) {
         console.log(data);
         $parent.remove();
       },
       error: function (xhr, textStatus, errorThrown) {
         console.log('Error in Operation');
       }
     });
   });
 });