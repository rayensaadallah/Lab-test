import { AfterViewInit, ViewChildren, QueryList, ElementRef, Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from './data.service';
import { ImageData } from './ImageData';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements AfterViewInit {
  @ViewChildren('lazyLoad') images!: QueryList<ElementRef>;
  data: ImageData[] = [];

  constructor(private dataService: DataService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.data = this.dataService.generateData();
  }

  ngAfterViewInit(): void {
    this.lazyLoadImages();
    this.cdRef.detectChanges();
    this.loadFavorites();


  }

  lazyLoadImages() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          const src = lazyImage.getAttribute('data-src');
          if (src) {
            lazyImage.src = src;
          }
          lazyImage.removeAttribute('data-src');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.images.forEach(imageRef => {
      imageObserver.observe(imageRef.nativeElement);
    });
  }

  onImageLoad(event: Event) {
    // Your logic here...
  }
  filter = {
    id: null as any,
    author: '',
    text: ''
  };
  applyFilter() {
    this.data = this.data.filter(item => {
      const idMatch = this.filter.id ? item.id == this.filter.id : true;
      const authorMatch = this.filter.author ? item.author.toLowerCase().includes(this.filter.author.toLowerCase()) : true;
      const textMatch = this.filter.text ? item.text.toLowerCase().includes(this.filter.text.toLowerCase()) : true;

      return idMatch && authorMatch && textMatch;
    });
  }
  

  toggleFavorite(item: ImageData) {
    item.favorite = !item.favorite;
    this.saveFavorites();
  }

  private saveFavorites() {
    const favorites = this.data.filter(item => item.favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private loadFavorites() {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (savedFavorites.length) {
      this.data.forEach(item => {
        const favItem = savedFavorites.find((fav: ImageData) => fav.id === item.id);
        if (favItem) {
          item.favorite = true;
        }
      });
    }
  }
  
}