angular.module('todoService', [])

    .factory('Todos', ['$http', function ($http) {

        return {

            get: ()  => $http.get('/api/todos'),

            add: (todoData) => $http.post('/api/todos', todoData),

            remove: (id) => $http.delete('/api/todos/' + id)
        }

    }]);