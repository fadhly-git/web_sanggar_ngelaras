<?php

namespace App\Http\Controllers;

use App\Models\NewsItems as NewsItemsModel;
use Illuminate\Http\Request;

class NewsItems extends Controller
{
    public function index()
    {
        $newsItems = NewsItemsModel::all();
        return response()->json($newsItems);
    }

    public function show($id)
    {
        $newsItem = NewsItemsModel::find($id);
        return response()->json($newsItem);
    }

    public function store(Request $request)
    {
        $newsItem = NewsItemsModel::create($request->all());
        return response()->json($newsItem, 201);
    }

    public function update(Request $request, $id)
    {
        $newsItem = NewsItemsModel::find($id);
        $newsItem->update($request->all());
        return response()->json($newsItem);
    }

    public function destroy($id)
    {
        NewsItemsModel::destroy($id);
        return response()->json(null, 204);
    }
}
