import mediaplansData from './data/mediaplansData';
import reportsData from './data/reportsData';

class AppController {
  model: any;
  view: any;

  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;

    // Обработчики событий:
    this.view.mediaplansAndReportsBtnGrp.addEventListener(
      'click',
      (event: MouseEvent) => {
        this.view.renderAllFilesContainer(event);
      }
    );

    this.view.toggleMediaplansListBtn.addEventListener('click', () => {
      this.handleMediaplansListToggle();
      console.log(this.model);
    });

    this.view.toggleReportsListBtn.addEventListener('click', () => {
      this.handleReportsListToggle();
      console.log(this.model);
    });

    this.view.assistantOptionsBtn.addEventListener('click', () => {
      this.view.renderAssistantOptionsMenu();
    });

    this.view.chatTextArea.addEventListener('focus', () => {
      this.view.renderChatBorderOnFocus();
    });

    this.view.chatTextArea.addEventListener('blur', () => {
      this.view.renderChatBorderOnFocus();
    });

    this.view.getMediaplansBtn.addEventListener('click', () => {
      this.handleMediaplansListRender();
    });

    this.view.getReportsBtn.addEventListener('click', () => {
      this.handleReportsListRender();
    });

    this.view.sendMsgBtn.addEventListener('click', () => {
      this.handleSendUserMsg();
    });

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.handleSendUserMsg();
      }
    });

    document.addEventListener('scroll', () => {
      this.view.handleStickyNavMenuOnScroll();
    });
  }

  // Добавление сообщения пользователя в чат:
  handleSendUserMsg() {
    const message: string = this.view.chatTextArea.value;

    if (message.length > 0) {
      this.view.addUserMsgToChat(message);
      this.view.chatTextArea.value = '';
    } else {
      alert('Пожалуйста введите Ваше сообщение!');
    }
  }

  // Toggle-функции списков медиапланов или ответов (когда загружены данные):
  handleMediaplansListToggle() {
    this.view.toggleMediaplansListVisibility(
      this.model.isMediaplansListOpened,
      this.view.mediaplansList
    );

    this.model.setMediaplansListOpened(!this.model.isMediaplansListOpened);
  }

  handleReportsListToggle() {
    this.view.toggleReportsListVisibility(
      this.model.isReportsListOpened,
      this.view.reportsList
    );

    this.model.setReportsListOpened(!this.model.isReportsListOpened);
  }

  // Подготовка к рендеру данных запрошенного списка:
  fileListRenderPrep(listElem: HTMLUListElement) {
    this.view.toggleElemVisibility(this.view.allFilesWrapper, true);
    this.view.toggleElemVisibility(this.view.allFilesCap, false);

    // чистим класс и innerHTML "заглушки" пустой даты, если была:
    listElem.classList.remove('empty-files-data');
    listElem.innerHTML = ``;
  }

  // Рендер списка медиапланов:
  // -------------------------------------------------------
  async handleMediaplansListRender() {
    if (this.model.isMediaplansDataLoaded) {
      alert('Данные по медиапланам уже были загружены!');
      return;
    }

    this.view.getMediaplansBtn.disabled = true;
    this.view.addAssistantMsgToChat(
      'Выполняется Ваш запрос данных по медиапланам'
    );

    // имитация загрузки данных:
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          this.view.getMediaplansBtn.disabled = false;
          resolve('Медиапланы загружены');
        }, this.model.loadTimer);
      });
    } catch (error) {
      console.log('Ошибка загрузки медиапланов:', (error as Error).message);
      return;
    }

    this.model.setIsMediaplansDataLoaded(true);
    this.view.addAssistantMsgToChat('Данные по медиапланам загружены');

    this.fileListRenderPrep(this.view.mediaplansList);

    // Данные по медиапланам перебираются и идет рендер элементов списка:
    mediaplansData.forEach((companyMediaplansData) => {
      const currentmediaplansListElem: HTMLLIElement =
        this.view.createMediaPlansListElem(
          companyMediaplansData.title,
          companyMediaplansData.isLoading,
          companyMediaplansData.isLoaded
        );

      this.model.addDataToMediaplansList(companyMediaplansData);
      this.view.mediaplansList.append(currentmediaplansListElem);

      // Обработчик загрузки данных по конкретному элементу списка медиапланов:
      const loadCompanyMediaplansBtn = currentmediaplansListElem.querySelector(
        '.media-plans-company__download'
      );
      loadCompanyMediaplansBtn?.addEventListener('click', () => {
        console.log('загружаем медиаплан компании ^_^');
      });
    });

    // заглушка для незагруженного типа данных
    this.view.createMediaplansOrReportsCap(
      !this.model.isReportsDataLoaded,
      this.view.reportsList,
      `Вы можете загрузить отчеты нажав на кнопку в чате`
    );

    console.log('текущее состояние:', this.model);
  }

  // Рендер списка отчетов:
  // -------------------------------------------------------
  async handleReportsListRender() {
    if (this.model.isReportsDataLoaded) {
      alert('Данные по отчетам уже были загружены!');
      return;
    }

    this.view.getReportsBtn.disabled = true;
    this.view.addAssistantMsgToChat('Запрос данных по отчетам');

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          this.view.getReportsBtn.disabled = false;
          resolve('Отчеты загружены');
        }, this.model.loadTimer);
      });
    } catch (error) {
      console.log('Ошибка загрузки отчетов:', (error as Error).message);
      return;
    }

    this.model.setIsReportsDataLoaded(true);
    this.view.addAssistantMsgToChat('Данные по отчетам загружены');

    this.fileListRenderPrep(this.view.reportsList);

    // Данные по медиапланам перебираются и идет рендер элементов списка:
    reportsData.forEach((companyReportsData) => {
      const currentReportsListElem: HTMLLIElement =
        this.view.createReportsListElem(
          companyReportsData.title,
          companyReportsData.isLoading,
          companyReportsData.isLoaded
        );

      this.model.addDataToReportsList(companyReportsData);

      this.view.reportsList.append(currentReportsListElem);

      // Обработчик загрузки данных по конкретному элементу списка медиапланов:
      const loadCompanyReportsBtn = currentReportsListElem.querySelector(
        '.elem-company__download'
      );
      loadCompanyReportsBtn?.addEventListener('click', () => {
        console.log('загружаем отчет компании ^_^');
      });
    });

    // заглушка для незагруженного типа данных
    this.view.createMediaplansOrReportsCap(
      !this.model.isMediaplansDataLoaded,
      this.view.mediaplansList,
      `Вы можете загрузить медиапланы нажав на кнопку в чате`
    );

    console.log('текущее состояние:', this.model);
  }
}

export default AppController;
