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

   $(".deleteEvent").on('click', function(event){
    let id = $(this).data('place-id');
    let $parent = $(this).parents('li');
    event.preventDefault();
     $.ajax({
       url: 'http://localhost:3000/api/events/'+id,
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

   $(".deleteGroup").on('click', function(event){
    let id = $(this).data('place-id');
    let $parent = $(this).parents('li');
    event.preventDefault();
     $.ajax({
       url: 'http://localhost:3000/api/groups/'+id,
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

  $(".deleteUser").on('click', function(event){
    let id = $(this).data('place-id');
    let $parent = $(this).parents('li');
    event.preventDefault();
     $.ajax({
       url: 'http://localhost:3000/api/users/'+id,
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

  $(".deleteDish").on('click', function(event){
    let id = $(this).data('place-id');
    let $parent = $(this).parents('li');
    event.preventDefault();
     $.ajax({
       url: 'http://localhost:3000/api/dishes/'+id,
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