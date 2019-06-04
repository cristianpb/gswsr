import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'cleanFacebook'
})
export class CleanFacebookPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(postFacebook: any, args?: any): any {
    let text = this.sanitizer.sanitize(SecurityContext.NONE, postFacebook.body);

    if (postFacebook.hashtags) {
      postFacebook.hashtags.forEach(tag => {
        text = text.replace(new RegExp(`${tag}`, 'gi'), `<span class="has-text-primary">${tag}</span>`);
      });
    }
              
    // Replace screen names with links
    if (postFacebook.mentions) {
      postFacebook.mentions.forEach(mention => {
        text = text.replace(new RegExp(`${mention}`, 'gi'), `<a href="https://twitter.com/${mention}" target="_blank" class="has-text-info">${mention}</a>`);
      });
    }

    // Replace newline characters
    text = text.replace(/\n/gm, '<br />');

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
