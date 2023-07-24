package handler

import (
	"context"
	"testing"

	"github.com/bufbuild/connect-go"
	"github.com/stretchr/testify/require"
	corev1 "k8s.io/api/core/v1"
	"sigs.k8s.io/controller-runtime/pkg/client/fake"

	kubev1alpha1 "github.com/akuity/kargo/api/v1alpha1"
	svcv1alpha1 "github.com/akuity/kargo/pkg/api/service/v1alpha1"
)

func TestGetStageV1Alpha1(t *testing.T) {
	testSets := map[string]struct {
		req          *svcv1alpha1.GetStageRequest
		errExpected  bool
		expectedCode connect.Code
	}{
		"empty project": {
			req: &svcv1alpha1.GetStageRequest{
				Project: "",
				Name:    "",
			},
			errExpected:  true,
			expectedCode: connect.CodeInvalidArgument,
		},
		"empty name": {
			req: &svcv1alpha1.GetStageRequest{
				Project: "kargo-demo",
				Name:    "",
			},
			errExpected:  true,
			expectedCode: connect.CodeInvalidArgument,
		},
		"existing Stage": {
			req: &svcv1alpha1.GetStageRequest{
				Project: "kargo-demo",
				Name:    "test",
			},
		},
		"non-existing project": {
			req: &svcv1alpha1.GetStageRequest{
				Project: "kargo-x",
				Name:    "test",
			},
			errExpected:  true,
			expectedCode: connect.CodeNotFound,
		},
		"non-existing Stage": {
			req: &svcv1alpha1.GetStageRequest{
				Project: "non-existing-project",
				Name:    "test",
			},
			errExpected:  true,
			expectedCode: connect.CodeNotFound,
		},
	}
	for name, ts := range testSets {
		ts := ts
		t.Run(name, func(t *testing.T) {
			t.Parallel()

			kc := fake.NewClientBuilder().
				WithScheme(mustNewScheme()).
				WithObjects(
					mustNewObject[corev1.Namespace]("testdata/namespace.yaml"),
					mustNewObject[kubev1alpha1.Stage]("testdata/stage.yaml"),
				).
				Build()

			res, err :=
				GetStageV1Alpha1(kc)(context.Background(), connect.NewRequest(ts.req))
			if ts.errExpected {
				require.Error(t, err)
				require.Equal(t, ts.expectedCode, connect.CodeOf(err))
				return
			}
			require.NotNil(t, res.Msg.GetStage())
			require.Equal(t, ts.req.GetProject(), res.Msg.Stage.Metadata.Namespace)
			require.Equal(t, ts.req.GetName(), res.Msg.Stage.Metadata.Name)
		})
	}
}