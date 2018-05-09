MainApp.controller('previewController', ['$scope', '$rootScope', '$sce',
    function ($scope, $rootScope, $sce) {

        $scope.configuration = configuration.currentApp;

        function youtube_parser(url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            return (match && match[7].length == 11) ? match[7] : false;
        }


        try {

            $scope.preview = JSON.parse(localStorage.getItem("preiview"));
            var htmlContent = $scope.preview.details.project.desc;
            $('#summernote').summernote('code', htmlContent);
            setNotepadStyle();



            var youtubeSrc = $scope.preview.details.poster.movieUrl;

            $scope.youtubeID = youtube_parser(youtubeSrc);
            $scope.youTubeS = '//www.youtube.com/embed/' + $scope.youtubeID + '"';
            $scope.youtube = $sce.trustAsHtml('<iframe width="250" height="450" src="//www.youtube.com/embed/' + $scope.youtubeID + '" frameborder="0" allowfullscreen></iframe>');
        }
        catch (e) {
            console.log(e);
        }

        //Hide all the non relevant style from notepad
        function setNotepadStyle() {

            $('.note-toolbar').hide();
            $('.note-resizebar').hide();
            $('.note-editor.note-frame').css("border-width", "0px");
            $('div.note-editable.panel-body').addClass('white-background');

            //disable editing
            $('#summernote').summernote('disable');
        }
    }]);

