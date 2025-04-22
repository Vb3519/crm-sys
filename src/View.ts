import getCurrentTime from './utils/getCurrentTime';

// ВИД:
class AppView {
  appHeader: HTMLDivElement | null;
  mediaplansAndReportsBtnGrp: HTMLDivElement | null;
  assistantOptionsBtn: HTMLButtonElement | null;
  assistantOptionsMenu: HTMLUListElement | null;

  allFilesContainer: HTMLDivElement | null;
  allFilesCap: HTMLDivElement | null;
  toggleMediaplansListBtn: HTMLDivElement | null;
  toggleReportsListBtn: HTMLDivElement | null;

  chatCap: HTMLDivElement | null;
  chatMessages: HTMLDivElement | null;
  chatWindow: HTMLDivElement | null;
  chatTextArea: HTMLTextAreaElement | null;
  sendMsgBtn: HTMLDivElement | null;

  allFilesWrapper: HTMLDivElement | null;
  mediaplansList: HTMLUListElement | null;
  getMediaplansBtn: HTMLButtonElement | null;
  reportsList: HTMLUListElement | null;
  getReportsBtn: HTMLButtonElement | null;

  constructor() {
    this.appHeader = document.querySelector('.app-page__header ');
    this.mediaplansAndReportsBtnGrp = document.querySelector(
      '.app-header__info-btn-grp'
    );
    this.assistantOptionsBtn = document.querySelector(
      '.assistant-title__badge'
    );
    this.assistantOptionsMenu = document.querySelector(
      '.assistant-title__options'
    );

    // все файлы (отчеты, медиапланы):
    this.allFilesContainer = document.querySelector('.app-main__all-files');
    this.allFilesCap = document.querySelector('.all-files__cap');

    // toggle-кнопки открытия списков отчетов или медиапланов (когда они загружены):
    this.toggleMediaplansListBtn = document.querySelector(
      '.media-plans-box__title'
    );
    this.toggleReportsListBtn = document.querySelector('.reports-box__title');

    // чат:
    this.chatCap = document.querySelector('.app-chat__descrip-and-actions');
    this.chatMessages = document.querySelector('.app-chat__messages');
    this.chatWindow = document.querySelector('.app-chat__body');
    this.chatTextArea = document.querySelector('.chat-body__text-area');
    this.sendMsgBtn = document.querySelector('.chat-actions__send-msg');

    // кнопки для загрузки отчетов или медиапланов:
    this.allFilesWrapper = document.querySelector(
      '.all-files__plans-and-reports-wrapper'
    );
    this.mediaplansList = document.querySelector('.media-plans-box__list');
    this.getMediaplansBtn = document.querySelector('.get-media-plans-btn');

    this.reportsList = document.querySelector('.reports-box__list');
    this.getReportsBtn = document.querySelector('.get-reports-btn');
  }

  // "Прилипающее" меню навигации при скролле:
  handleStickyNavMenuOnScroll() {
    const isNavMenuSticky: boolean = window.innerWidth < 1440;
    if (!this.appHeader || !this.mediaplansAndReportsBtnGrp) return;

    if (isNavMenuSticky && window.scrollY > 0) {
      this.appHeader.classList.add('sticky-nav-menu');
      this.mediaplansAndReportsBtnGrp.classList.add('hidden-elem');
    } else {
      this.appHeader.classList.remove('sticky-nav-menu');
      this.mediaplansAndReportsBtnGrp.classList.remove('hidden-elem');
    }
  }

  // Скрыть или отобразить элемент:
  toggleElemVisibility(elem: HTMLElement, visibilityOption: boolean) {
    if (visibilityOption) {
      elem.classList.remove('hidden-elem');
      elem.classList.add('active-elem');
    } else {
      elem.classList.remove('active-elem');
      elem.classList.add('hidden-elem');
    }
  }

  // Toggle-списков файлов (медиапланы или отчеты):
  toggleMediaplansListVisibility(isListOpened: boolean, elem: HTMLElement) {
    if (this.toggleMediaplansListBtn) {
      this.toggleMediaplansListBtn.innerHTML = `
            <h3 class="media-plans-box__title__text">Медиапланы</h3>
            ${
              isListOpened
                ? `<i class="fa-solid fa-chevron-down"></i>`
                : `<i class="fa-solid fa-chevron-up"></i>`
            }
        `;
    }

    elem.classList.toggle('hidden-elem');
  }

  toggleReportsListVisibility(isListOpened: boolean, elem: HTMLElement) {
    if (this.toggleReportsListBtn) {
      this.toggleReportsListBtn.innerHTML = `
              <h3 class="reports-box__title__text">Отчеты</h3>
              ${
                isListOpened
                  ? `<i class="fa-solid fa-chevron-down"></i>`
                  : `<i class="fa-solid fa-chevron-up"></i>`
              }
          `;
    }

    elem.classList.toggle('hidden-elem');
  }

  // Отображение контейнера со списками медиапланов и отчетов:
  renderAllFilesContainer(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('info-btn-grp__btn')) {
      this.allFilesContainer?.classList.toggle('active-elem');
    }
  }

  // Меню опций обратной связи ассистента:
  renderAssistantOptionsMenu(): void {
    this.assistantOptionsMenu?.classList.toggle('active-elem');
  }

  // Рамка вокруг окна чата при фокусе:
  renderChatBorderOnFocus(): void {
    this.chatWindow?.classList.toggle('chat-active');
  }

  // ------------------------------------------------------------
  // Рендер элементов списка отчетов или медиапланов:

  // "заглушка" для пока незагруженного списка данных:
  createMediaplansOrReportsCap(
    option: boolean,
    elem: HTMLUListElement,
    text: string
  ) {
    // если данные не загружены - то выполняется условие
    if (option) {
      elem.classList.add('empty-files-data');
      elem.innerHTML = `
          <i class="fa-regular fa-folder-closed"></i>
          <p class="empty-files-data-text">${text}</p>
        `;
    }
  }

  // Создание эл-та из списка медиапланов:
  createMediaPlansListElem(
    title: string,
    isElemDataLoaded: boolean,
    isLoading: boolean
  ): HTMLLIElement {
    const mediaplansDataElem = document.createElement('li');
    mediaplansDataElem.classList.add('media-plans-list__elem');

    mediaplansDataElem.innerHTML = `
      <div class="media-plans-list__elem__company media-plans-company">
        <i class="fa-regular fa-folder-closed"></i>
        <p class="media-plans-company__name">${title}</p>
        <div class="media-plans-company__download">
          ${
            isLoading
              ? 'Загрузка идет...'
              : `<i class="fa-solid fa-download"></i>`
          }
        </div>
      </div>
    
      ${
        isElemDataLoaded
          ? `
        <div class="media-plans-list__elem__rdy media-plan-elem-rdy">
            <i class="fa-solid fa-check"></i>
            <p class="media-plan-elem-rdy__text">Медиаплан от 18.04.2025 готов</p>
        </div>`
          : ''
      }
    `;

    return mediaplansDataElem;
  }

  // создание эл-та из списка отчетов:
  createReportsListElem(
    title: string,
    isElemDataLoaded: boolean,
    isLoading: boolean
  ): HTMLLIElement {
    const reportsDataElem = document.createElement('li');
    reportsDataElem.classList.add('reports-list__elem');

    reportsDataElem.innerHTML = `
      <div class="reports-list__elem__company reports-company">
        <i class="fa-regular fa-folder-closed"></i>
        <p class="reports-company__name">${title}</p>

        ${
          isLoading
            ? `<div class="reports-company__download">
          <i class="fa-solid fa-download"></i>
        </div>`
            : `<div class="reports-company__download download-process">
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </div>`
        }
      </div>
    
      ${
        isElemDataLoaded
          ? `
        <div class="media-plans-list__elem__rdy media-plan-elem-rdy">
            <i class="fa-solid fa-check"></i>
            <p class="media-plan-elem-rdy__text">Отчет от 18.04.2025 готов</p>
        </div>`
          : ''
      }
    `;

    return reportsDataElem;
  }

  // Сообщения в чате:
  // Ассистент:
  createAssistantChatMessage(assistantMsg: string) {
    const assistantChatMsg = document.createElement('div');
    assistantChatMsg.classList.add(
      'app-chat__messages__message',
      'assitant-msg'
    );
    assistantChatMsg.innerHTML = `
      <div class="assitant-msg__body">
        <div class="assitant-msg__body__photo">
          <i class="fa-regular fa-user"></i>
        </div>
        <div class="assitant-msg__body__text">
          <span>${assistantMsg}</span>
        </div>
      </div>
      <div class="assitant-msg__info">
        <span class="assitant-msg__from">Jim</span>
        <span class="assitant-msg__info__time">${getCurrentTime()}</span>
      </div>
  `;

    return assistantChatMsg;
  }

  // Пользователь:
  createUserChatMsg(userMsg: string) {
    const userChatMsg = document.createElement('div');
    userChatMsg.classList.add('app-chat__messages__message', 'my-msg');
    userChatMsg.innerHTML = `
      <div class="my-msg__body">
        <div class="my-msg__body__text">
          <span>${userMsg}</span>
        </div>
      </div>
      <div class="my-msg__info">
        <span class="my-msg__info__time">${getCurrentTime()}</span>
      </div>
    `;

    return userChatMsg;
  }

  // добавление сообщения в чат:
  addAssistantMsgToChat(message: string) {
    if (this.chatCap) {
      this.toggleElemVisibility(this.chatCap, false); // скрыть "заглушку" пустого чата и отобразить чат
    }

    const messageElement: HTMLDivElement =
      this.createAssistantChatMessage(message);

    if (this.chatMessages) {
      this.toggleElemVisibility(this.chatMessages, true);
      this.chatMessages.append(messageElement);
    }
  }

  addUserMsgToChat(message: string) {
    if (this.chatCap) {
      this.toggleElemVisibility(this.chatCap, false); // скрыть "заглушку" пустого чата и отобразить чат
    }

    const messageElement: HTMLDivElement = this.createUserChatMsg(message);

    if (this.chatMessages) {
      this.toggleElemVisibility(this.chatMessages, true);
      this.chatMessages.append(messageElement);
    }
  }
}

export default AppView;
