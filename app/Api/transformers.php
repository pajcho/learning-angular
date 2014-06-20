<?php

// Member transformer
API::transform('App\Models\Member', 'Api\Transformers\MemberTransformer');
API::transform('App\Models\MemberGroup', 'Api\Transformers\MemberGroupTransformer');