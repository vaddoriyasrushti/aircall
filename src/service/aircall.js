import baseService from './baseService'

export function getCallList() {
    return baseService.get('/activities',{
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export function updateCallList(id, data) {
    return baseService.patch(
        `/activities/${id}`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
