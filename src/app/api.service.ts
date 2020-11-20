import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private apiRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }


  getTodoItems() {
    return this.http.get(this.apiRoot.concat('todoItem/'));
  }

  createTodoItem(tarefa: string, enable: boolean) {
    return this.http.post(
      this.apiRoot.concat('todoItem/'),
      { tarefa, enable}
    );
  }

  deleteTodoItem(id: number) {
      return this.http.delete(this.apiRoot.concat(`todoItem/${id}/`));
  }

  feitoTodoItem(id: number, tarefa: string, feito: boolean) {
        let enable: boolean;
        if(feito == true){
            enable = false;
            return this.http.put(
                this.apiRoot.concat(`todoItem/${id}/`),
                { tarefa, enable}
            );
        }
        if(feito == false){
            enable = true;
            return this.http.put(
                this.apiRoot.concat(`todoItem/${id}/`),
                { tarefa, enable}
            );
        }
    }

    editarTodoItem(id: number, tarefa: string, feito: boolean) {
        return this.http.put(
            this.apiRoot.concat(`todoItem/${id}/`),
            { tarefa, feito}
        );
    }

}