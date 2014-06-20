@if ($errors->any())
    <div class="alert alert-danger alert-dismissable alert-message {{ isset($alertClass) ? $alertClass : '' }}">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="glyphicon glyphicon-exclamation-sign"></i> Error</h4>
        <span>Please check the form below for errors</span>
    </div>
@endif

@if ($message = Session::get('success'))
    <div class="alert alert-success alert-dismissable alert-message {{ isset($alertClass) ? $alertClass : '' }}">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="glyphicon glyphicon-ok-sign"></i> Success</h4>
        <span>{{ $message }}</span>
    </div>
@endif

@if ($message = Session::get('error'))
    <div class="alert alert-danger alert-dismissable alert-message {{ isset($alertClass) ? $alertClass : '' }}">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="glyphicon glyphicon-exclamation-sign"></i> Error</h4>
        <span>{{ $message }}</span>
    </div>
@endif

@if ($message = Session::get('warning'))
    <div class="alert alert-warning alert-dismissable alert-message {{ isset($alertClass) ? $alertClass : '' }}">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="glyphicon glyphicon-warning-sign"></i> Warning</h4>
        <span>{{ $message }}</span>
    </div>
@endif

@if ($message = Session::get('info'))
    <div class="alert alert-info alert-dismissable alert-message {{ isset($alertClass) ? $alertClass : '' }}">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="glyphicon glyphicon-info-sign"></i> Info</h4>
        <span>{{ $message }}</span>
    </div>
@endif
