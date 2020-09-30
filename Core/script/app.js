$(function(){
    // Basic Setup
    var $tableSel = $('#attendance');
    $tableSel.dataTable();
    
    $('#filter').on('click', function(e){
      e.preventDefault();
      var startDate = $('#start').val(),
          endDate = $('#end').val();
      
      filterByDate(0, startDate, endDate); // We call our filter function
      
      $tableSel.dataTable().fnDraw(); // Manually redraw the table after filtering
    });
    
    // Clear the filter. Unlike normal filters in Datatables,
    // custom filters need to be removed from the afnFiltering array.
    $('#clearFilter').on('click', function(e){
      e.preventDefault();
      $.fn.dataTableExt.afnFiltering.length = 0;
      $tableSel.dataTable().fnDraw();
    });
    
  });
  
  /* Our main filter function
   * We pass the column location, the start date, and the end date
   */
  var filterByDate = function(column, startDate, endDate) {
    // Custom filter syntax requires pushing the new filter to the global filter array
          $.fn.dataTableExt.afnFiltering.push(
              function( oSettings, aData, iDataIndex ) {
                  var rowDate = normalizeDate(aData[column]),
                start = normalizeDate(startDate),
                end = normalizeDate(endDate);
            
            // If our date from the row is between the start and end
            if (start <= rowDate && rowDate <= end) {
              return true;
            } else if (rowDate >= start && end === '' && start !== ''){
              return true;
            } else if (rowDate <= end && start === '' && end !== ''){
              return true;
            } else {
              return false;
            }
          }
          );
      };
  
  // converts date strings to a Date object, then normalized into a YYYYMMMDD format (ex: 20131220). Makes comparing dates easier. ex: 20131220 > 20121220
  var normalizeDate = function(dateString) {
    var date = new Date(dateString);
    var normalized = date.getFullYear() + '' + (("0" + (date.getMonth() + 1)).slice(-2)) + '' + ("0" + date.getDate()).slice(-2);
    return normalized;
  }
  
  // Filler data for demo (thanks to http://json-generator.com)
//   var dummyData = [
//       {
//           "date": "2020-09-28",
//           "employee": "Dono",
//           "timeIn": "07:00:00 AM",
//           "timeOut": "05:00:00 PM",
//           "totalHours":"10hr",
//           "status":"OK",
//           "action":"<a href='#'>Edit</a>"
//       },
//       {
//         "date": "2020-09-28",
//         "employee": "Dono",
//         "timeIn": "07:00:00 AM",
//         "timeOut": "05:00:00 PM",
//         "totalHours":"10hr",
//         "status":"OK",
//         "action":"<a href='#'>Edit</a>"
//     },
//     {
//         "date": "2020-09-28",
//         "employee": "Dono",
//         "timeIn": "07:00:00 AM",
//         "timeOut": "05:00:00 PM",
//         "totalHours":"10hr",
//         "status":"OK",
//         "action":"<a href='#'>Edit</a>"
//     },
//     {
//         "date": "2020-09-28",
//         "employee": "Dono",
//         "timeIn": "07:00:00 AM",
//         "timeOut": "05:00:00 PM",
//         "totalHours":"10hr",
//         "status":"OK",
//         "action":"<a href='#'>Edit</a>"
//     },
//     {
//         "date": "2020-09-28",
//         "employee": "Dono",
//         "timeIn": "07:00:00 AM",
//         "timeOut": "05:00:00 PM",
//         "totalHours":"10hr",
//         "status":"OK",
//         "action":"<a href='#'>Edit</a>"
//     },
//     {
//         "date": "2020-09-28",
//         "employee": "Dono",
//         "timeIn": "07:00:00 AM",
//         "timeOut": "05:00:00 PM",
//         "totalHours":"10hr",
//         "status":"OK",
//         "action":"<a href='#'>Edit</a>"
//     },
  
//   ];
  