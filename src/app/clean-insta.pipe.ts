import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'cleanInsta'
})
export class CleanInstaPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(postInsta: any, args?: any): any {
    let text = this.sanitizer.sanitize(SecurityContext.NONE, postInsta.body);

    if (postInsta.hashtags) {
      postInsta.hashtags.forEach(tag => {
        text = text.replace(new RegExp(`${tag}`, 'gi'), `<span class="has-text-primary">${tag}</span>`);
      });
    }
              
    // Replace screen names with links
    if (postInsta.mentions) {
      postInsta.mentions.forEach(mention => {
        text = text.replace(new RegExp(`${mention}`, 'gi'), `<a href="https://twitter.com/${mention}" target="_blank" class="has-text-info">${mention}</a>`);
      });
    }

    // Replace newline characters
    text = text.replace(/\n/gm, '<br />');

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
