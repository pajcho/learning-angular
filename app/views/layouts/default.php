<!DOCTYPE html>
<html lang="en" ng-app="app" data-ng-controller="AppController">
    <head>
        <base href="/">

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title> Learning Angular </title>
        
        <script>
            // Set project base url to use in scripts when needed
            var baseUrl = "<?php echo url('/') ?>";
        </script>
        
        <!-- BEGIN THEME STYLES -->
        <link href="<?php echo asset('assets/css/bootstrap.css') ?>" rel="stylesheet" type="text/css"/>
        <link href="<?php echo asset('assets/css/font-awesome.min.css') ?>" rel="stylesheet">
        <link href="<?php echo asset('assets/css/loading-bar.css') ?>" rel="stylesheet" type="text/css"/>
        <link href="<?php echo asset('assets/css/toastr.min.css') ?>" rel="stylesheet" type="text/css"/>
        <link href="<?php echo asset('assets/vendor/select2/select2.css') ?>" rel="stylesheet" type="text/css"/>
        <link href="<?php echo asset('assets/vendor/select2/select2-bootstrap.css') ?>" rel="stylesheet" type="text/css"/>
        <link href="<?php echo asset('assets/css/main.css') ?>" rel="stylesheet" type="text/css"/>
        <!-- END THEME STYLES -->

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>

	<body>

        <!-- Header -->
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse:first">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#/" class="navbar-brand">Learning Angular</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">

                        <li ng-class="{active: isActive('/members')}">
                            <a href="#/members"><i class="fa fa-user"></i> Members</a>
                        </li>
                        <li ng-class="{active: isActive('/members/groups')}">
                            <a href="#/members/groups"><i class="fa fa-users"></i> Groups</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">

                <div class="col-md-10 col-md-offset-1 main">
                    <div class="hidden" id="flash-messages">
                        <div ng-repeat="message in flash" class="alert alert-dismissable alert-message {{ message.alertClass }}">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="message.remove($index)">&times;</button>
                            <h4 ng-bind-html="message.heading | to_trusted"></h4>
                            <span>{{ message.message }}</span>
                        </div>
                    </div>
                    <div id="angular-view" ng-view></div>
                </div>
            </div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?php echo asset("assets/js/jquery-1.11.0.min.js") ?>"><\/script>')</script>
        <script src="<?php echo asset('assets/js/bootstrap.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/angular.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/angular-route.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/angular-animate.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/loading-bar.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/ui.bootstrap/ui-bootstrap-tpls-0.11.0.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/toastr.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/moment-with-langs.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/vendor/select2/select2.min.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/vendor/ui.select2/select2.js') ?>" type="text/javascript"></script>

        <!-- Custom project scripts -->
        <script src="<?php echo asset('assets/js/application/app.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/filters.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/services/DateService.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/services/FlashService.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/services/MembersService.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/services/GroupsService.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/controllers/AppController.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/controllers/DashboardController.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/controllers/MembersController.js') ?>" type="text/javascript"></script>
        <script src="<?php echo asset('assets/js/application/controllers/GroupsController.js') ?>" type="text/javascript"></script>
        <script>
            angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
        </script>

	</body>
</html>
