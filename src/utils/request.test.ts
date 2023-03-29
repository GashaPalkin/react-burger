import { checkResponse, request } from './request';

describe('Function checkResponse', () => {

    it('should return json if response is ok', async () => {
        const res = new Response(JSON.stringify({ data: 'test' }), { status: 200 });
        const data = await checkResponse(res);
        expect(data).toEqual({ data: 'test' });
    });
    it('should reject with error message if response is not ok', async () => {
        const res = new Response(JSON.stringify({ error: 'error' }), { status: 400 });
        await expect(checkResponse(res)).rejects.toEqual('error');
    });
});

describe('Function request', () => {

    it('should return result ok', async () => {
        const res = new Response();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ...res,
            json: jest.fn().mockResolvedValue({ result: 'ok' }),
            ok: true
        })

        const result = await request('url')
        expect(result).toEqual({ result: 'ok' })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    it('should reject with error message if response is not ok', async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(new Response(JSON.stringify({ error: 'error' }), { status: 400 }))
        );
        await expect(request('url')).rejects.toEqual('error');
        expect(fetch).toHaveBeenCalledTimes(1)
    });

})
