import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarModule, ButtonModule, MenubarModule, Dialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('gscience-ai-ui');

  items: MenuItem[] | undefined;
  protected displayAbout: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/app-home'],
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
        visible: true,
        items: [
          {
            label: 'About',
            icon: 'pi pi-id-card',
            command: () => {
              this.displayAbout = true;
            },
          },
        ],
      }
    ];
  }

  /**
   * Resolves the correct image path relative to the application's base-href.
   */
  getFullImageUrl(path: any): any {
    // 1. Handle null, undefined, or empty values
    if (!path) {
      return 'profile.jpg';
    }

    // 2. Check if it's an Angular SafeUrl object
    // If it's not a string, it's likely already sanitized, so return it directly.
    if (typeof path !== 'string') {
      return path;
    }

    // 3. Now we know path is a string, we can safely use .startsWith
    if (path.startsWith('http') || path.startsWith('data:')) {
      return path;
    }

    // 4. Remove any leading slash to keep it relative
    return path.startsWith('/') ? path.substring(1) : path;
  }

}
