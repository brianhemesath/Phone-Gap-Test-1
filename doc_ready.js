var notificationTimer;
var workingTimer;

$(document).on('pageinit','[data-role=page]', function(){

  $('.sfdc_logout, #operation_selection_list').unbind('click');

// Show/hide log out
  if (readCookie('SFDCaccess_token')) {
    $('.sfdc_logout').css('display', 'block');
    $('#home').children('div[data-role="content"]').css('display', 'block');
    $('.sfdc_login').hide();
  } else {
    $('.sfdc_logout').hide();
    $('#home').children('div[data-role="content"]').hide();
    $('.sfdc_login').css('display', 'block');
  }


// Check for SFDC Authentication
  if (window.location.href.indexOf("#access_token") !== -1) {
    var urlParameters = window.location.href.split('#')[1].split('&');
// Clear the token from the browser
    window.location.replace(window.location.href.split('#')[0]);
// Go through each parameter and set the variables
    for (var i = 0; i < urlParameters.length; i++) {
      if (urlParameters[i].split('=')[0] == 'access_token') document.cookie = 'SFDCaccess_token=' + urlParameters[i].split('=')[1] + '; path=/';
      if (urlParameters[i].split('=')[0] == 'instance_url') document.cookie = 'SFDCinstance_url=' +  decodeURIComponent(urlParameters[i].split('=')[1]) + '; path=/';
      if (urlParameters[i].split('=')[0] == 'id') document.cookie = 'SFDCid=' + urlParameters[i].split('=')[1] + '; path=/';
      if (urlParameters[i].split('=')[0] == 'issued_at') document.cookie = 'SFDCissued_at=' + urlParameters[i].split('=')[1] + '; path=/';
      if (urlParameters[i].split('=')[0] == 'state') document.cookie = 'SFDCstate=' + urlParameters[i].split('=')[1] + '; path=/';
      if (urlParameters[i].split('=')[0] == 'scope') document.cookie = 'SFDCscope=' + urlParameters[i].split('=')[1] + '; path=/';
    }
// Redirect to operations page
    $.mobile.changePage('#operation_selection', {transition: 'slide'});
  }
// Disconnect SFDC
  $('.sfdc_logout').click(function() {
    document.cookie = 'SFDCaccess_token=; path=/';
    document.cookie = 'SFDCinstance_url=; path=/';
    document.cookie = 'SFDCid=; path=/';
    document.cookie = 'SFDCissued_at=; path=/';
    document.cookie = 'SFDCstate=; path=/';
    document.cookie = 'SFDCscope=; path=/';
    $('#client_side_oauth').html('Client oauth: ' + readCookie('SFDCaccess_token') + '<br />' + readCookie('SFDCinstance_url'));
    $('.sfdc_login').show();
    $('.sfdc_logout').hide();
  });

  $('#operation_selection_list li').click(function() {
    if ($(this).attr('id').length) {
      $('#field_entry_header_name').text(($(this).attr('id')));
      $.mobile.changePage('#field_entry', {transition: 'slide'});
    }
  });

});
