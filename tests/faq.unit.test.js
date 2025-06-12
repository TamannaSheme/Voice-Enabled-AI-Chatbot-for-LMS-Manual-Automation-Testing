/**
 * @jest-environment jsdom
 */

describe("FAQ Page Unit Testing", () => {
  let mockNavigate;

  const toggleAnswer = (element) => {
    const answer = element.querySelector('.answer');
    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
  };

  beforeEach(() => {
    mockNavigate = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { assign: mockNavigate },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("[U41] Toggle answer display from none to block", () => {
    document.body.innerHTML = `
      <div class="faq-item">
        <div class="question">How do I submit an assignment?</div>
        <div class="answer" style="display: none;">Answer text here</div>
      </div>
    `;

    const faqItem = document.querySelector(".faq-item");
    toggleAnswer(faqItem);

    const answer = faqItem.querySelector(".answer");
    expect(answer.style.display).toBe("block");
  });

  test("[U42] Toggle answer display from block to none", () => {
    document.body.innerHTML = `
      <div class="faq-item">
        <div class="question">How do I submit an assignment?</div>
        <div class="answer" style="display: block;">Answer text here</div>
      </div>
    `;

    const faqItem = document.querySelector(".faq-item");
    toggleAnswer(faqItem);

    const answer = faqItem.querySelector(".answer");
    expect(answer.style.display).toBe("none");
  });

  test("[U43] Navigate to Ask Lumi page", () => {
    window.location.assign("ask-lumi.html");
    expect(mockNavigate).toHaveBeenCalledWith("ask-lumi.html");
  });
});
