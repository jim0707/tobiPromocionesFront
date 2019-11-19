export const getGTM = (category, action, label) => {
    window.dataLayer.push({
        'event': 'virtualEvent',
        'category': category,
        'action': action,
        'label': label
    });
}
