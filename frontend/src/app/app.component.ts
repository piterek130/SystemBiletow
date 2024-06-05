import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {RepertoireComponent} from "./components/movies/repertoire/repertoire.component";
import {NavigationBarComponent} from "./layout/navigation-bar/navigation-bar.component";
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RepertoireComponent, NavigationBarComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'SystemBiletow';
  message: string = '';

}
